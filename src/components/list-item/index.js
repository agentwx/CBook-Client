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
      value: 'middle'
    },
    hasArrow: {
      type: [Boolean, String],
      value: true
    },
    bordered: {
      type: [Boolean, String],
      value: true
    }
  },
  data: {
  },
  computed: {
    isBordered () {
      return coerce(this.data.bordered)
    },
    isHasArrow () {
      return coerce(this.data.hasArrow)
    }
  }
})
