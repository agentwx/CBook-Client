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
    show: {
      type: Boolean,
      value: true
    },
    visible: {
      type: Boolean,
      value: true
    },
    loadingText: {
      type: String,
      value: '正在加载 ...'
    }
  }
})
