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
    selectIndex: {
      type: Number,
      value: 0
    },
    value: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      value: false
    },
    useSlot: {
      type: Boolean,
      value: false
    }
  },
  computed: {
    isDisabled () {
      return coerce(this.data.disabled)
    },
    isUseSlot () {
      return coerce(this.data.useSlot)
    },
    items () {
      return this.data.range.map(item => typeof item === 'object' ? item.text : item)
    }
  },
  ready () {
    const {value, range} = this.data
    if (value) {
      const index = range.findIndex(item => typeof item === 'object'
          ? item.value === value
          : item === value
      )
      this.setData({
        selectIndex: index < 0 ? 0 : index
      })
    }
  },
  methods: {
    change (e) {
      const {value} = e.detail
      this.triggerEvent('change', {value: this.data.range[value], selectIndex: value})
    },
    columnchange (e) {
      const {column, value} = e.detail
      this.triggerEvent('columnchange', {column: column, value: value})
    }
  }
})
