import computedBehavior from 'miniprogram-computed'
import { easingMap, easingReverseMap } from '../constants/easing'

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
      reverseDuration: {
        type: Number,
        value: -1
      },
      easing: {
        type: String,
        value: 'ease'
      },
      reverseEasing: String,
      autoReverse: Boolean,
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
        const { type, easing, reverseEasing, autoReverse } = this.data
        let value
        if (type === 'enter') {
          value = easingMap[easing]
        } else {
          value = reverseEasing || (autoReverse ? easingMap[easingReverseMap[easing]] : easingMap[easing])
        }
        if (typeof value === 'function') {
          value = value()
        }
        if (value) {
          return `cubic-bezier(${value})`
        } else {
          return this.data.easing
        }
      },
      durationValue () {
        const { type, duration, reverseDuration } = this.data
        let value
        if (type === 'enter') {
          value = duration
        } else {
          value = reverseDuration >= 0 ? reverseDuration : duration
        }
        return value
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
