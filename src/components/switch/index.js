import computedBehavior from 'miniprogram-computed'
import { classNames } from '../../utils/classnames'

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
    checked: {
      type: Boolean,
      observer (value) {
        this.setData({ value })
      }
    },
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '30px'
    }
  },

  computed: {
    classes() {
      return classNames('node-class switch', {
        'switch--on': this.data.checked,
        'switch--disabled': this.data.disabled
      })
    },

    style() {
      const backgroundColor = this.data.checked ? this.data.activeColor : this.data.inactiveColor
      return `${this.data.customStyle};font-size: ${this.data.size};${ backgroundColor ? `background-color: ${backgroundColor}` : '' }`
    }
  },

  attached() {
    this.setData({ value: this.data.checked })
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        const checked = !this.data.checked
        this.triggerEvent('input', {value: checked})
        this.triggerEvent('change', {value: checked})
      }
    }
  }
})
