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
    showSpin: false,
    products: []
  },
  attached () {
    this.pageNum = 1
    this.spinOn = false
    this.queryParams = null
    this.lastTime = Date.now()
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
        // 通过时间差控制最后一页没数据时可能导致的循环请求
        if (self.data.inited && (Date.now() - self.lastTime > 3000)) {
          self.lastTime = Date.now()
          self.spinOn = false
          self.appendData()
        }
      }

      page.onPullDownRefresh = function (e) {
        _onPullDownRefresh(e)
        if (!self.data.inited) {
          wx.stopPullDownRefresh()
          return
        }
        self.spinOn = false
        wx.showNavigationBarLoading()
        self.reloadData().then(() => {
          wx.stopPullDownRefresh()
          wx.hideNavigationBarLoading()
        })
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
          isLoading: true,
          showSpin: this.data.inited && this.spinOn
        })
        if (!this.data.inited) {
          wx.showNavigationBarLoading()
        }
        let res = await fetch.post(this.data.api, { ...params, offset: this.pageNum }, false)
        let items = res.datas.Items || []

        if (this.pageNum === 1) {
          this.data.products = items
          this.goTop(reset)
        } else {
          this.data.products = this.data.products.concat(items)
        }

        if (!this.data.inited) {
          wx.hideNavigationBarLoading()
        }

        this.setData({
          products: this.data.products,
          isLoading: false,
          inited: true,
          showSpin: false
        })

        if (items.length > 0) {
          this.pageNum++
        } else {
          toast.error('没有更多数据了~')
        }

        this.triggerEvent('success', { data: res })
      } catch (e) {
        this.setData({
          isLoading: false,
          inited: true,
          showSpin: false
        })
        this.triggerEvent('error')
      } finally {
        this.spinOn = true
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
