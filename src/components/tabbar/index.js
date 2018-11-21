const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
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
    tabBar: {
      type: Object,
      value: {
        color: '#777',
        selectedColor: '#08b0fe',
        borderStyle: '#ddd',
        backgroundColor: '#fff',
        list: []
      }
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  computed: {
    style () {
      if (!this.data.tabBar) return ''
      let {borderStyle, backgroundColor} = this.data.tabBar
      return `border-top-color:${borderStyle};background-color:${backgroundColor};`
    }
  },
  lifetimes: {
    ready () {
      this.triggerEvent('change', {value: this.data.tabIndex})
    }
  },
  methods: {
    tap (e) {
      const index = e.currentTarget.dataset.index
      if (this.data.tabIndex === index) return
      if (!this.data.disabled) {
        this.setData({
          tabIndex: index
        })
      }
      this.triggerEvent('change', {value: index})
    }
  }
})
