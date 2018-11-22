const computedBehavior = require('miniprogram-computed')

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
    show: {
      type: Boolean,
      value: true
    },
    visible: {
      type: Boolean,
      value: true
    },
    fixedBottom: {
      type: [Boolean, String],
      value: false
    },
    loadingText: {
      type: String,
      value: '正在加载 ...'
    }
  },
  computed: {
    isFixedBottom () {
      return typeof this.data.fixedBottom === 'string'
        ? JSON.parse(this.data.fixedBottom)
        : this.data.fixedBottom
    }
  }
})
