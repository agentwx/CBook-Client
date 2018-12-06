const computedBehavior = require('miniprogram-computed')

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
    size: {
      type: String,
      value: 'normal'
    },
    name: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'iconfont'
    },
    color: String
  },
  data: {
    isCustomSize: false
  },
  computed: {
    iconColor () {
      return this.data.color ? `color: ${this.data.color}` : ''
    },
    iconSize () {
      const { isCustomSize, size } = this.data
      return isCustomSize ? `font-size: ${size};` : ''
    }
  },
  attached () {
    this.setData({
      isCustomSize: /^\d/.test(this.data.size)
    })
  }
})
