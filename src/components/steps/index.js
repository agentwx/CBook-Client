import computedBehavior from 'miniprogram-computed'

const coerce = (v) =>
  typeof v === 'string'
    ? JSON.parse(v)
    : v

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
    stepIndex: {
      type: Number,
      value: 0
    },
    vertical: {
      type: [Boolean, String],
      value: true
    },
    itemHeight: {
      type: Number,
      value: 65
    },
    items: {
      type: Array,
      value: [],
      observer (value) {
        this.buildData(value)
      }
    }
  },
  data: {
    dataList: [],
    collapsed: true,
    isExpanded: false
  },
  computed: {
    isVertical() {
      return coerce(this.data.vertical)
    },
    curItem() {
      return this.data.dataList[this.data.stepIndex]
    }
  },
  methods: {
    buildData(items) {
      this.setData({
        dataList: items.map(item => ({...item, collapsed: true}))
      })
    },
    toggleItem(e) {
      const index = e.currentTarget.dataset.index
      const subItems = this.data.dataList[index].subItems
      if (!subItems || !subItems.length) return
      let newDataList = this.data.dataList.map((item, i) => i === index ? ({...item, collapsed: !item.collapsed}) : item)
      this.setData({
        dataList: newDataList
      })
    },
    togglePanel() {
      this.setData({
        isExpanded: false
      })
      this.setData({
        collapsed: !this.data.collapsed
      })
    },
    onTransitionEnd() {
      this.setData({
        isExpanded: !this.data.collapsed
      })
    }
  }
})
