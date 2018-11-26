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
    icon: String,
    iconSize: {
      type: String,
      value: 'large'
    },
    iconType: {
      type: String,
      value: 'iconfont'
    },
    inline: {
      type: [Boolean, String],
      value: true
    }
  },
  computed: {
    isInline () {
      return coerce(this.data.inline)
    }
  }
})
