import Parabola from '../../utils/parabola'

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
    show: {
      type: Boolean,
      value: false,
      observer (value) {
        this.handleShow(value)
      }
    },
    startX: {
      type: Number,
      value: 0
    },
    startY: {
      type: Number,
      value: 0
    },
    endX: {
      type: Number,
      value: 0
    },
    endY: {
      type: Number,
      value: 0
    },
    duration: {
      type: Number,
      value: 500
    },
    autoStart: {
      type: Boolean,
      value: true
    },
    curvature: {
      type: Number,
      value: 0.005
    },
    useCss: {
      type: Boolean,
      value: true
    }
  },

  data: {
    animationData: null,
    innerAnimationData: null
  },

  ready () {
    const { useCss, duration } = this.data
    this.parabola = null
    this.animation = wx.createAnimation({
      duration: useCss ? duration : 0,
      timeingFunction: 'linear'
    })
    this.innerAnimation = wx.createAnimation({
      duration: duration,
      timeingFunction: 'linear'
    })
  },

  detached () {
    if (this.parabola) {
      this.parabola.stop()
    }
  },

  methods: {
    handleShow (value) {
      if (value === true) {
        if (this.data.useCss) {
          wx.nextTick(() => {
            this.animateByCss()
          })
        } else {
          this.animateByJs()
        }
      } else {
        if (this.parabola) {
          this.parabola.stop()
        }
      }
    },
    animateByCss () {
      const { startX, startY, endX, endY, duration } = this.data
      const offsetX = endX - startX
      const offsetY = endY - startY
      this.animation.translate3d(0, offsetX, 0).step()
      this.innerAnimation.translate3d(offsetY, 0, 0).step()
      this.setData({
        animationData: this.animation.export(),
        innerAnimationData: this.innerAnimation.export()
      })
      setTimeout(() => {
        this.setData({
          animationData: null,
          innerAnimationData: null
        })
        this.triggerEvent('complete', {value: {offsetX, offsetY, startX, startY, endX, endY}})
      }, duration)
    },
    animateByJs () {
      if (this.parabola) return

      const {
        startX, startY, endX, endY,
        duration, curvature, autoStart
      } = this.data

      this.parabola = new Parabola({
        startX,
        startY,
        endX,
        endY,
        duration,
        curvature,
        autoStart,
        complete: (offsetX, offsetY) => {
          this.parabola = null
          this.triggerEvent('complete', {
            value: {offsetX, offsetY, startX, startY, endX, endY}
          })
        },
        step: (x, y, offsetX, offsetY) => {
          this.animation.translate3d(x, y).step()
          this.setData({
            animationData: this.animation.export()
          })
          this.triggerEvent('step', {
            value: {x, y, offsetX, offsetY, startX, startY, endX, endY}
          })
        }
      })
    }
  }
})
