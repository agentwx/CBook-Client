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
    size: {
      type: String,
      value: 'normal'
    },
    range: {
      type: Array,
      value: []
    },
    value: {
      type: [String, Number],
      observer (value) {
        this.setSelectIndex(value)
      }
    },
    disabled: {
      type: Boolean,
      value: false
    },
    placeholder: String,
    useSlot: {
      type: Boolean,
      value: false
    }
  },
  data: {
    selectIndex: 0
  },
  computed: {
    isDisabled () {
      return coerce(this.data.disabled)
    },
    isUseSlot () {
      return coerce(this.data.useSlot)
    },
    items () {
      return this.data.range.map(item => item.text)
    }
  },
  methods: {
    setSelectIndex (value) {
      const index = this.data.range.findIndex(item => item.value === value)
      this.setData({
        selectIndex: index < 0 ? 0 : index
      })
    },
    change (e) {
      const { value } = e.detail
      const valueObj = this.data.range[value]
      this.triggerEvent('change', {value: valueObj.value, text: valueObj.text, selectedIndex: value})
    },
    columnChange (e) {
      const {column, value} = e.detail
      this.triggerEvent('columnchange', {column: column, value: value})
    }
  }
})
