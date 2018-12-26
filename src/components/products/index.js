import fetch from '../../service/fetch'
import { getCurrentPage } from '../../utils/util'

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    queryParams: {
      type: Object,
      observer (value) {
        this.loadData(value, true)
      }
    },
    resetTop: Number,
    searchMode: Boolean
  },
  data: {
    isLoading: true,
    inited: false,
    products: []
  },
  attached () {
    this.pageNum = 1
    this.queryParams = null
    if (this.data.searchMode) {
      this.setData({
        inited: true
      })
    }
    this.handlePage()
  },
  methods: {
    handlePage() {
      let self = this
      let page = getCurrentPage()
      let _onReachBottom = page.onReachBottom || function () {}
      let _onPullDownRefresh = page.onPullDownRefresh || function () {}

      page.onReachBottom = function (e) {
        _onReachBottom(e)
        self.setData({
          inited: false
        })
        self.appendData()
      }

      page.onPullDownRefresh = function (e) {
        _onPullDownRefresh(e)
        self.reloadData().then(wx.stopPullDownRefresh)
      }
    },
    onClick (e) {
      let index = e.currentTarget.dataset.index
      this.triggerEvent('itemtap', { item: this.data.products[index], index })
    },
    async loadData (params, reset) {
      this.queryParams = params
      try {
        this.triggerEvent('beforeSend')
        this.setData({
          isLoading: true
        })
        this.pageNum = params.offset || this.pageNum
        let url = this.data.searchMode ? '/sales/search' : '/sales/list'
        let res = await fetch.post(url, { ...params, offset: this.pageNum }, false)
        wx.nextTick(() => {
          this.triggerEvent('success', { data: res })
        })
        let items = res.datas.Items || []
        if (this.pageNum === 1) {
          this.setData({
            products: items
          })
          this.goTop()
        } else {
          this.data.products = this.data.products.concat(items)
          this.setData({
            products: this.data.products
          })
        }
        if (items.length > 0) {
          this.pageNum++
          this.setData({
            isEmpty: false
          })
        } else {
          this.setData({
            isEmpty: true
          })
        }
      } catch (e) {
        this.triggerEvent('error')
      } finally {
        this.setData({
          isLoading: false,
          inited: true
        })
        this.triggerEvent('complete')
      }
    },
    reloadData () {
      return this.loadData({...this.queryParams, offset: 1})
    },
    appendData () {
      return this.loadData({...this.queryParams, offset: null})
    },
    goTop () {
      const { resetTop, inited } = this.data
      if (reset && inited && typeof resetTop === 'number') {
        wx.pageScrollTo({
          scrollTop: resetTop,
          duration: 0
        })
      }
    }
  }
})
