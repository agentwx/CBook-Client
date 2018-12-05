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

  attached () {
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
        const { useCss, startY, endY } = this.data
        if ((useCss && Math.abs(endY - startY) < 50) || !useCss) {
          this.animateByJs()
        } else {
          wx.nextTick(() => {
            this.animateByCss()
          })
        }
      } else {
        if (this.parabola) {
          this.parabola.stop()
        }
      }
    },
    getInstance () {
      return this.parabola
    },
    animateByCss () {
      const { startX, startY, endX, endY, duration } = this.data
      const offsetX = endX - startX
      const offsetY = endY - startY
      this.animation.translate3d(0, offsetY, 0).step()
      this.innerAnimation.translate3d(offsetX, 0, 0).step()
      this.setData({
        animationData: this.animation.export(),
        innerAnimationData: this.innerAnimation.export()
      })
      setTimeout(() => {
        this.setData({
          animationData: null,
          innerAnimationData: null
        })
        this.triggerEvent('complete', {
          value: {offsetX, offsetY, startX, startY, endX, endY}
        })
      }, duration)
    },
    animateByJs () {
      if (this.parabola) return

      const {
        startX, startY, endX, endY,
        duration, curvature
      } = this.data

      this.parabola = new Parabola({
        startX,
        startY,
        endX,
        endY,
        duration,
        curvature,
        autoStart: true,
        complete: (offsetX, offsetY) => {
          this.parabola = null
          this.triggerEvent('complete', {
            value: {offsetX, offsetY, startX, startY, endX, endY}
          })
        },
        step: (x, y, offsetX, offsetY) => {
          if (!this.animation) return
          this.animation.option.transition.duration = 0
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
