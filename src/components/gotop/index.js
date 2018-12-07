import { getCurrentPage } from '../../utils/util'

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    customClass: {
      type: String,
      value: ''
    },
    customStyle: {
      type: String,
      value: ''
    },
    showOffset: {
      type: Number,
      value: 300
    },
    useSlot: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false
  },
  ready () {
    let self = this
    let page = getCurrentPage()
    let origScroll = page.onPageScroll
    page.onPageScroll = function (e) {
      origScroll(e)

      let visible = false
      if (e.scrollTop > self.data.showOffset) {
        visible = true
      }

      if (visible !== self.data.visible) {
        self.setData({
          visible
        })
      }
    }
  },
  methods: {
    onClick () {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    }
  }
})
