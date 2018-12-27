import computedBehavior from 'miniprogram-computed'

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
    },
    showValue: {
      type: [Boolean, String],
      value: true
    }
  },
  computed: {
    isReadonly () {
      return coerce(this.data.readonly)
    },
    isShowValue () {
      return coerce(this.data.showValue)
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
