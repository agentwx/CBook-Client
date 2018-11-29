const computedBehavior = require('miniprogram-computed')
const { getNodeRect } = require('../../utils/util')

const coerce = (v) =>
  typeof v === 'string'
    ? JSON.parse(v)
    : v

Component({
  behaviors: [computedBehavior],
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
    leftIcon: {
      type: String,
      value: 'notice'
    },
    delay: {
      type: Number,
      value: 0
    },
    speed: {
      type: Number,
      value: 20
    },
    additWidth: {
      type: Number,
      value: 16
    },
    scrollable: {
      type: [Boolean, String],
      value: true
    },
    closeable: {
      type: [Boolean, String],
      value: false
    },
    showArrow: {
      type: [Boolean, String],
      value: false
    }
  },
  computed: {
    isScrollable () {
      return coerce(this.data.scrollable)
    },
    isCloseable () {
      return coerce(this.data.closeable)
    },
    isShowArrow () {
      return coerce(this.data.showArrow)
    }
  },
  data: {
    show: true,
    inited: false
  },
  lifetimes: {
    ready () {
      this.init()
    },
    detached () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  },
  methods: {
    init () {
      getNodeRect('.notice-bar-scroller', this).then(rect => {
        if (!rect || !rect.width) {
          return
        }
        this.width = rect.width
        getNodeRect('.notice-bar-bd', this).then(rect => {
          if (!rect || !rect.width) {
            return
          }
          this.wrapWidth = rect.width
          const {
            speed, isScrollable, delay, additWidth
          } = this.data

          if (isScrollable && this.wrapWidth < this.width) {
            this.elapse = (this.width + additWidth) / speed * 1000
            this.animation = wx.createAnimation({
              duration: this.elapse,
              timeingFunction: 'linear',
              delay
            })
            this.resetAnimation = wx.createAnimation({
              duration: 0,
              timeingFunction: 'linear'
            })
            this.scroll()
          }

          this.setData({
            inited: true
          })

        })
      })
    },
    scroll() {
      const { speed } = this.data
      const {
        animation, resetAnimation, wrapWidth, elapse
      } = this
      resetAnimation.translateX(wrapWidth).step()
      const animationData = animation.translateX(-(elapse * speed) / 1000).step()
      this.setData({
        animationData: resetAnimation.export()
      })
      setTimeout(() => {
        this.setData({
          animationData: animationData.export()
        })
      }, 100)

      this.timer = setTimeout(() => {
        this.scroll()
      }, elapse)
    },
    onClose () {
      if (this.data.isCloseable) {
        this.setData({
          show: false
        })
      }
    }
  }
})
