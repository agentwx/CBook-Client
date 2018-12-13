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
    show: Boolean,
    mask: Boolean,
    duration: {
      type: Number,
      value: 400
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    // for prevent touchmove
    noop() {}
  }
})
