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
    size: {
      type: String,
      value: 'normal'
    },
    actived: {
      type: [Boolean, String],
      value: false
    },
    selected: {
      type: [Boolean, String],
      value: false
    }
  },
  computed: {
    isActived () {
      return coerce(this.data.actived)
    },
    isSelected () {
      return coerce(this.data.selected)
    }
  }
})
