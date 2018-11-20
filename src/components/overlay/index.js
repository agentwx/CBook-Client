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
    show: Boolean,
    mask: Boolean,
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
