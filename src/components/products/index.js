import fetch from '../../service/fetch'
import { getCurrentPage } from '../../utils/util'

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    queryParams: {
      type: String,
      observer (value) {
        this.loadData(JSON.parse(value))
      }
    }
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
    async loadData (params) {
      this.queryParams = params
      try {
        this.setData({
          isLoading: true
        })
        let pageNum = params.offset || this.pageNum
        let res = await fetch.post('/sales/list', {...params, offset: pageNum}, false)
        let items = res.datas.Items || []
        if (pageNum === 1) {
          this.setData({
            products: items
          })
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
      } finally {
        this.setData({
          isLoading: false,
          inited: true
        })
      }
    },
    reloadData () {
      return this.loadData({...this.queryParams, offset: 1})
    },
    appendData () {
      return this.loadData({...this.queryParams, offset: null})
    }
  }
})
