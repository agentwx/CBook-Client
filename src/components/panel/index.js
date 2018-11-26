Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    customClass: {
      type: String,
      value: ''
    },
    customStyle: {
      type: String,
      value: ''
    }
  }
})
