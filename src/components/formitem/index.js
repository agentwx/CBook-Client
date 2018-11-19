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
    extraClass: {
      type: String,
      value: ''
    },
    extraStyle: {
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
      type: [String, Number],
      value: ''
    },
    maxlength: {
      type: String,
      value: -1
    },
    placeholder: {
      type: String,
      value: ''
    },
    bordered: {
      type: [Boolean, String],
      value: true
    },
    showClear: {
      type: [Boolean, String],
      value: false
    },
    showEye: {
      type: [Boolean, String],
      value: false
    },
    nomargin: {
      type: [Boolean, String],
      value: false
    },
    underline: {
      type: [Boolean, String],
      value: false
    },
    disabled: {
      type: [Boolean, String],
      value: false
    },
    type: {
      type: String,
      value: 'text'
    },
    password: {
      type: String,
      value: ''
    },
    focus: {
      type: String,
      value: 'false'
    }
  },
  computed: {
    isBordered () {
      return coerce(this.data.bordered)
    },
    isShowClear () {
      return coerce(this.data.showClear)
    },
    isShowEye () {
      return coerce(this.data.showEye)
    },
    isNomargin () {
      return coerce(this.data.nomargin)
    },
    isUnderline () {
      return coerce(this.data.underline)
    },
    isDisabled () {
      return coerce(this.data.disabled)
    },
    shouldClearShow() {
      return this.data.isShowClear ? this.data.value !== '' : false
    },
    eyeName() {
      return this.data.password ? 'eye-closed' : 'eye-opened'
    }
  },
  methods: {
    clearField() {
      this.setData({
        value: ''
      })
    },
    togglePwdVisible() {
      this.setData({
        password: !this.data.password
      })
    },
    input(e) {
      this.triggerEvent('input', {value: e.detail.value})
    },
    focus(e) {
      this.triggerEvent('focus', {value: e.detail.value})
    },
    blur(e) {
      this.triggerEvent('blur', {value: e.detail.value})
    },
    confirm(e) {
      this.triggerEvent('confirm', {value: e.detail.value})
    }
  }
})
