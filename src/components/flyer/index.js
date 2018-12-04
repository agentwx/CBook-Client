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
    }
  },

  ready () {
    this.parabola = null
    this.animation = wx.createAnimation({
      duration: 0,
      timeingFunction: 'linear'
    })
  },

  methods: {
    handleShow (value) {
      if (value === true && !this.parabola) {
        this.parabola = new Parabola({
          startX: this.data.startX,
          startY: this.data.startY,
          endX: this.data.endX,
          endY: this.data.endY,
          curvature: this.data.curvature,
          duration: this.data.duration,
          autoStart: this.data.autoStart,
          complete: (x, y) => {
            this.parabola = null
            this.triggerEvent('complete', {value: {x, y}})
          },
          step: (x, y) => {
            this.animation.translate3d(x, y).step()
            this.setData({
              animationData: this.animation.export()
            })
            this.triggerEvent('step', {value: {x, y}})
          }
        })
      } else {
        if (this.parabola) {
          this.parabola.stop()
        }
      }
    }
  }
})
