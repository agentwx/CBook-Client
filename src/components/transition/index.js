const { transition } = require('../../mixins/transition')

Component({
  behaviors: [transition(true)],
  options: {
    addGlobalClass: true
  },
  properties: {
    customStyle: {
      type: String,
      value: ''
    },
    customClass: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: 'fade'
    }
  }
})
