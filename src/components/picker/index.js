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
    items: {
      type: Array,
      value: []
    },
    selectIndex: {
      type: Number,
      value: 0
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  computed: {
    isDisabled () {
      return coerce(this.data.disabled)
    },
    names () {
      return this.data.items.map(item => item.name)
    }
  },
  methods: {
    change (e) {
      this.triggerEvent('pickerchange', {value: this.data.items[this.data.selectIndex], selectIndex: e.detail.value})
    },
    columnchange (e) {
      this.triggerEvent('pickercolumnchange', {value: this.data.selectIndex})
    }
  }
})
