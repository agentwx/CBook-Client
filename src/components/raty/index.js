import computedBehavior from 'miniprogram-computed'

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
    color: {
      type: String,
      value: '#d3d3d3'
    },
    activeColor: {
      type: String,
      value: '#faa431'
    },
    size: {
      type: String,
      value: '16px'
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
      if (!this.data.readonly) {
        const ratyIndex = e.currentTarget.dataset.index
        this.setData({
          value: ratyIndex + 1
        })
        this.triggerEvent('change', {value: this.data.value}, { bubbles: false })
      }
    }
  }
})
