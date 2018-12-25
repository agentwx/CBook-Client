const computedBehavior = require('miniprogram-computed')
const SIZE_MAP = {
  'large': '32px',
  'middle': '22px',
  'normal': '18px',
  'small': '15px',
  'mini': '12px'
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
  computed: {
    iconColor () {
      return this.data.color ? `color: ${this.data.color}` : ''
    },
    bound () {
      const { size } = this.data
      return SIZE_MAP[size] || size
    },
    iconSize () {
      const { size } = this.data
      return `font-size:${SIZE_MAP[size] || size};`
    }
  }
})
