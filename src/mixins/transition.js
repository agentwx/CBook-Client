import computedBehavior from 'miniprogram-computed'
import { easingMap } from '../constants/easing'

export const transition = function (showDefaultValue) {
  return Behavior({
    behaviors: [computedBehavior],
    properties: {
      show: {
        type: Boolean,
        value: showDefaultValue,
        observer (value) {
          this.observeShow(value)
        }
      },
      duration: {
        type: Number,
        value: 400
      },
      easing: {
        type: String,
        value: 'ease'
      },
      delay: {
        type: Number,
        value: 0
      }
    },

    data: {
      type: '',
      inited: false,
      display: false
    },

    computed: {
      easingValue () {
        let value = easingMap[this.data.easing]
        if (value) {
          return `cubic-bezier(${value.join(',')})`
        } else {
          return this.data.easing
        }
      }
    },

    attached () {
      if (this.data.show) {
        this.show()
      }
    },

    methods: {
      observeShow (value) {
        if (value) {
          this.show()
        } else {
          this.setData({
            type: 'leave'
          })
        }
      },

      show () {
        this.setData({
          inited: true,
          display: true,
          type: 'enter'
        })
      },

      onAnimationEnd () {
        if (!this.data.show) {
          this.setData({
            display: false
          })
        }
        this.triggerEvent('animationend', { visible: this.data.show })
      }
    }
  })
}
