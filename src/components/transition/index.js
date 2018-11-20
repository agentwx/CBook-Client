const { transition } = require('../../mixins/transition')

Component({
  behaviors: [transition(true)],
  options: {
    addGlobalClass: true
  },
  properties: {
    extraStyle: {
      type: String,
      value: ''
    },
    extraClass: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: 'fade'
    }
  }
})
