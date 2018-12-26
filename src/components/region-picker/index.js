import computedBehavior from 'miniprogram-computed'

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
    label: String,
    icon: String,
    iconType: String,
    labelWidth: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: 'normal'
    },
    value: {
      type: Array,
      value: []
    },
    customItem: {
      type: String,
      value: ''
    },
    placeholder: String,
    disabled: {
      type: [Boolean, String],
      value: false
    },
    bordered: {
      type: [Boolean, String],
      value: true
    },
    underline: {
      type: [Boolean, String],
      value: false
    },
    nomargin: {
      type: [Boolean, String],
      value: false
    },
    useSlot: {
      type: [Boolean, String],
      value: false
    },
    resetable: {
      type: [Boolean, String],
      value: false
    }
  },
  computed: {
    isDisabled () {
      return coerce(this.data.disabled)
    },
    isBordered () {
      return coerce(this.data.bordered)
    },
    isUnderline () {
      return coerce(this.data.underline)
    },
    isNomargin () {
      return coerce(this.data.nomargin)
    },
    isUseSlot () {
      return coerce(this.data.useSlot)
    },
    isResetable () {
      return coerce(this.data.resetable)
    },
    valueStr () {
      return this.data.value.join(' ')
    }
  },
  methods: {
    change (e) {
      this.setData({
        value: e.detail.value
      })
      this.triggerEvent('change', {value: e.detail.value})
    },
    reset () {
      this.setData({
        value: []
      })
      this.triggerEvent('change', {value: []})
    }
  }
})
