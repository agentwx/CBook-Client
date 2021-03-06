Component({
  properties: {
    size: {
      type: String,
      value: 'small'
    },
    visible: {
      type: Boolean,
      value: true
    },
    customClass: {
      type: String,
      value: ''
    },
    customStyle: {
      type: String,
      value: ''
    }
  },
  data: {
  },
  methods: {
    show: function () {
      if (this.data.visible === false) {
        this.setData({
          visible: true
        })
      }
    },
    hide: function () {
      if (this.data.visible === true) {
        this.setData({
          visible: false
        })
      }
    },
    toggle: function () {
      if (this.data.visible === true) {
        this.hide()
      } else {
        this.show()
      }
    }
  }
})
