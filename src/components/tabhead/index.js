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
    tabIndex: {
      type: Number,
      value: 0
    },
    items: {
      type: Array,
      value: []
    }
  },
  lifetimes: {
    ready () {
      this.triggerEvent('change', {value: this.data.tabIndex})
    }
  },
  methods: {
    onItemTap (e) {
      const index = e.currentTarget.dataset.index
      if (this.data.tabIndex === index) return
      this.setData({
        tabIndex: index
      })
      this.triggerEvent('change', {value: index})
    }
  }
})
