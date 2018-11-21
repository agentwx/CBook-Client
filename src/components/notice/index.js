const computedBehavior = require('miniprogram-computed')

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
    items: {
      type: Array,
      value: []
    },
    delay: {
      type: Number,
      value: 0
    },
    interval: {
      type: Number,
      value: 4000
    },
    speed: {
      type: Number,
      value: 600
    },
    show: {
      type: Boolean,
      value: true
    },
    closeable: {
      type: [Boolean, String],
      value: true
    }
  },
  computed: {
    isCloseable () {
      return coerce(this.data.closeable)
    }
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
    _cacOffset() {
      const { items } = this.data
      return items.length > 1 ? (1 / items.length) * 100 : 0
    },
    onClick (e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('tap', {value: this.data.items[index], index: index})
    },
    onClose () {
      if (this.data.isCloseable) {
        this.setData({
          show: false
        })
        this.triggerEvent('close')
      }
    },
    init () {
      const { delay, speed } = this.data

      this.animation = wx.createAnimation({
        duration: speed,
        timeingFunction: 'linear',
        delay
      })
      this.resetAnimation = wx.createAnimation({
        duration: 0,
        timeingFunction: 'linear'
      })
      this.scroll()
    },
    scroll() {
      const { speed, interval, items } = this.data

      if (items.length < 2) return

      const {
        animation, resetAnimation
      } = this

      const animationData = animation.translateY(`-${this._cacOffset()}%`).step()
      const resetAnimationData = resetAnimation.translateY(0).step()

      this.setData({
        animationData: animationData.export()
      })

      setTimeout(() => {
        items.push(items.shift())
        this.setData({
          items: items,
          animationData: resetAnimationData.export()
        })
      }, speed)

      this.timer = setTimeout(() => {
        this.scroll()
      }, interval)
    }
  }
})
