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
    count: {
      type: Number,
      value: 3
    },
    visible: Boolean
  }
})
