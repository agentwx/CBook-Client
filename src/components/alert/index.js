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
    showArrow: {
      type: [Boolean, String],
      value: true
    }
  },
  computed: {
    isShowArrow () {
      return coerce(this.data.showArrow)
    }
  },
  methods: {
  }
})
