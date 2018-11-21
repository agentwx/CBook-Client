const computedBehavior = require('miniprogram-computed')

const coerce = (v) =>
  typeof v === 'string'
    ? JSON.parse(v)
    : v

Component({
  behaviors: [computedBehavior],
  options: {
    multipleSlots: true,
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
    visible: {
      type: [Boolean, String],
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    showClose: {
      type: [Boolean, String],
      value: true
    }
  },
  computed: {
    isShowClose () {
      return coerce(this.data.showClose)
    },
    isVisible () {
      return coerce(this.data.visible)
    }
  },
  methods: {
    open (e) {
      this.setData({
        visible: true
      })
      this.$emit('modalOpen', e)
    },
    close (e) {
      this.setData({
        visible: false
      })
      this.$emit('modalClose', e)
    },
    closeModal (e) {
      this.close(e)
    }
  }
})
