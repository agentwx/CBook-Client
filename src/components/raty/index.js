const computedBehavior = require('miniprogram-computed')

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
    max: {
      type: Number,
      value: 5
    },
    value: {
      type: Number,
      value: 0
    },
    readonly: {
      type: Boolean,
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
