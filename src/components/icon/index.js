const computedBehavior = require('miniprogram-computed')
const SIZE_MAP = {
  'x-large': '80rpx',
  'large': '64rpx',
  'middle': '44rpx',
  'normal': '36rpx',
  'small': '30rpx',
  'x-small': '24rpx'
}

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
      const { size } = this.data
      return `font-size: ${SIZE_MAP[size] || size};`
    }
  }
})
