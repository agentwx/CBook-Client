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
    icon: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: 'normal'
    },
    type: {
      type: String,
      value: 'primary'
    },
    inline: {
      type: [Boolean, String],
      value: false
    },
    disabled: {
      type: [Boolean, String],
      value: false
    },
    bordered: {
      type: [Boolean, String],
      value: false
    },
    circled: {
      type: [Boolean, String],
      value: true
    },
    loading: {
      type: [Boolean, String],
      value: false
    },
    iconType: {
      type: String,
      value: 'iconfont'
    }
  },
  computed: {
    isInline () {
      return coerce(this.data.inline)
    },
    isDisabled () {
      return coerce(this.data.disabled)
    },
    isBordered () {
      return coerce(this.data.bordered)
    },
    isCircled () {
      return coerce(this.data.circled)
    },
    isLoading () {
      return coerce(this.data.loading)
    }
  }
})
