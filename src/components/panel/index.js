Component({
  options: {
    multipleSlots: true,
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
    }
  }
})
