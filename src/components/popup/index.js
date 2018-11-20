const {transition} = require('../../mixins/transition')

Component({
  behaviors: [transition(false)],
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
    transition: String,
    overlayStyle: {
      type: String,
      value: ''
    },
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'center'
    }
  },

  methods: {
    onClickOverlay() {
      this.triggerEvent('click-overlay')

      if (this.data.closeOnClickOverlay) {
        this.triggerEvent('close')
      }
    }
  }
})
