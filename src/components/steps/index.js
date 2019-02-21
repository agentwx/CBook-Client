import computedBehavior from 'miniprogram-computed'
import { getNodeRect } from '../../utils/util'

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
    isExpanded: false,
    wrapHeight: 0,
    subWrapHeight: 0
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
      const dataList = this.data.dataList
      const subItems = this.data.dataList[index].subItems
      if (!subItems || !subItems.length) return

      dataList[index].collapsed = !dataList[index].collapsed

      if (!dataList[index].collapsed) {
        getNodeRect('.steps-subwrap > .step-item', this, true).then(ret => {
          const subWrapHeight = ret.reduce((prev, cur) => cur.height + prev, 0)
          this.setData({
            dataList: dataList,
            subWrapHeight
          })
        })
      } else {
        this.setData({
          dataList: dataList
        })
      }
    },
    togglePanel() {
      this.setData({
        isExpanded: false
      })
      if (this.data.collapsed) {
        getNodeRect('.steps-panel-wrap > .step-item', this, true).then(ret => {
          const wrapHeight = ret.reduce((prev, cur) => cur.height + prev, 0)
          this.setData({
            collapsed: false,
            wrapHeight
          })
        })
      } else {
        this.setData({
          collapsed: true
        })
      }
    },
    onTransitionEnd() {
      this.setData({
        isExpanded: !this.data.collapsed
      })
    }
  }
})
