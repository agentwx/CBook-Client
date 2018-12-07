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
    useSlot: Boolean,
    disabled: Boolean
  },
  data: {
    visible: false
  },
  ready () {
    if (!this.data.disabled) {
      this.handlePage()
    }
  },
  methods: {
    handlePage() {
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
    onClick () {
      if (!this.data.disabled) {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
      }
    }
  }
})
