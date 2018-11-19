
Component({
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
