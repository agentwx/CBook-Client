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
    size: {
      type: String,
      value: 'normal'
    },
    type: {
      type: String,
      value: 'primary'
    },
    disabled: {
      type: [Boolean, String],
      value: false
    },
    checked: {
      type: [Boolean, String],
      value: false,
      observer (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.triggerEvent('change', {value: this.data.value, checked: newVal})
        }
      }
    },
    readonly: {
      type: [Boolean, String],
      value: false
    },
    value: {
      type: [String, Number],
      value: ''
    }
  },
  data: {
  },
  computed: {
    isDisabled () {
      return coerce(this.data.disabled)
    },
    isChecked () {
      return coerce(this.data.checked)
    },
    isReadonly () {
      return coerce(this.data.readonly)
    }
  },
  methods: {
    onTap() {
      this.setData({
        checked: !this.data.checked
      })
    }
  }
})
