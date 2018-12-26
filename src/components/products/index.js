import fetch from '../../service/fetch'
import { getCurrentPage, toast } from '../../utils/util'

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
    api: String
  },
  data: {
    isLoading: true,
    inited: false,
    products: []
  },
  attached () {
    this.pageNum = 1
    this.queryParams = null
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
        this.pageNum = params.offset || this.pageNum
        this.setData({
          isLoading: true
        })
        let res = await fetch.post(this.data.api, { ...params, offset: this.pageNum }, false)
        let items = res.datas.Items || []
        if (this.pageNum === 1) {
          this.setData({
            products: items
          })
          this.goTop(reset)
        } else {
          this.setData({
            products: this.data.products.concat(items)
          })
        }
        if (items.length > 0) {
          this.pageNum++
        } else {
          toast.error('没有更多数据了')
        }
        this.triggerEvent('success', { data: res })
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
    goTop (reset) {
      const { resetTop, inited } = this.data
      if (reset && inited) {
        wx.pageScrollTo({
          scrollTop: resetTop,
          duration: 0
        })
      }
    }
  }
})
