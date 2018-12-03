import computedBehavior from 'miniprogram-computed'
import { classNames } from '../../utils/classnames'
const MAX = 2147483647

Component({
  behaviors: [computedBehavior, 'wx://form-field'],
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
    integer: Boolean,
    disabled: Boolean,
    disableInput: Boolean,
    min: {
      type: null,
      value: 1
    },
    max: {
      type: null,
      value: MAX
    },
    step: {
      type: null,
      value: 1
    }
  },

  computed: {
    classes() {
      return classNames('input-class', 'plus-class', 'minus-class', this.data.customClass)
    },
    minusDisabled() {
      return this.data.disabled || this.data.value <= this.data.min
    },

    plusDisabled() {
      return this.data.disabled || this.data.value >= this.data.max
    }
  },

  attached() {
    this.setData({
      value: this.range(this.data.value)
    })
  },

  methods: {
    // limit value range
    range(value) {
      return Math.max(Math.min(this.data.max, value), this.data.min)
    },

    onInput(event) {
      const { value = '' } = event.detail || {}
      this.triggerInput(value)
    },

    onChange(type) {
      if (this.data[`${type}Disabled`]) {
        this.triggerEvent('overlimit', {value: type})
        return
      }

      const diff = type === 'minus' ? -this.data.step : +this.data.step
      const value = Math.round((this.data.value + diff) * 100) / 100
      this.triggerInput(this.range(value))
      this.triggerEvent(type)
    },

    onBlur(event) {
      const value = this.range(this.data.value)
      this.triggerInput(value)
      this.triggerEvent('blur', event)
    },

    onMinus() {
      this.onChange('minus')
    },

    onPlus() {
      this.onChange('plus')
    },

    triggerInput(value) {
      this.setData({ value })
      this.triggerEvent('change', {value})
    }
  }
})
