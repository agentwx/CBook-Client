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
  computed: {
    iconColor () {
      return this.data.color ? `color: ${this.data.color}` : ''
    }
  }
})
