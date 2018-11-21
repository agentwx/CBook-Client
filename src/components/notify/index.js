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
    text: String,
    color: {
      type: String,
      value: '#fff'
    },
    backgroundColor: {
      type: String,
      value: '#f44'
    },
    duration: {
      type: Number,
      value: 3000
    },
    show: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    show() {
      const {duration} = this.data

      clearTimeout(this.timer)
      this.setData({
        show: true
      })

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(() => {
          this.hide()
        }, duration)
      }
    },

    hide() {
      clearTimeout(this.timer)
      this.setData({
        show: false
      })
    }
  }
})
