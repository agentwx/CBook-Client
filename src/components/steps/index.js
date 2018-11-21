
Component({
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
    stepIndex: {
      type: Number,
      value: 0
    },
    items: {
      type: Array,
      value: []
    }
  }
})
