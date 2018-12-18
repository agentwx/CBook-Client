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
    max: {
      type: Number,
      value: 5
    },
    value: {
      type: Number,
      value: 0
    },
    readonly: {
      type: [Boolean, String],
      value: true
    }
  },
  computed: {
    isReadonly () {
      return typeof this.data.readonly === 'string'
        ? JSON.parse(this.data.readonly)
        : this.data.readonly
    },
    ratyIndex () {
      return Math.floor(this.data.value)
    }
  },
  methods: {
    change (e) {
      if (!this.readonly) {
        const ratyIndex = e.currentTarget.dataset.index
        this.setData({
          value: ratyIndex + 1
        })
        this.triggerEvent('change', {value: this.data.value}, { bubbles: false })
      }
    }
  }
})
