import computedBehavior from 'miniprogram-computed'
import { getNodeRect } from '../../utils/util'

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
    inactive: Boolean,
    percentage: Number,
    pivotText: {
      type: String,
      observer: 'getWidth'
    },
    pivotColor: String,
    showPivot: {
      type: Boolean,
      value: true,
      observer: 'getWidth'
    },
    color: {
      type: String,
      value: '#1989fa'
    },
    textColor: {
      type: String,
      value: '#fff'
    }
  },

  data: {
    pivotWidth: 0,
    progressWidth: 0
  },

  computed: {
    portionStyle() {
      const width = (this.data.progressWidth - this.data.pivotWidth) * this.data.percentage / 100 + 'px'
      const background = this.data.inactive ? '#cacaca' : this.data.color
      return `width: ${width};background: ${background} `
    },

    pivotStyle() {
      const currentColor = this.data.inactive ? '#cacaca' : this.data.color
      const color = this.data.textColor
      const background = this.data.pivotColor || currentColor
      return `color: ${color};background: ${background}`
    },

    text() {
      return this.data.pivotText || this.data.percentage + '%'
    }
  },

  ready () {
    this.getWidth()
  },

  methods: {
    getWidth() {
      getNodeRect('.progress', this).then(rect => {
        this.setData({
          progressWidth: rect.width
        })
      })

      getNodeRect('.progress__pivot', this).then(rect => {
        this.setData({
          pivotWidth: rect.width || 0
        })
      })
    }
  }
})
