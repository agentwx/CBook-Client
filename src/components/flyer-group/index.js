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
    show: {
      type: Boolean,
      value: true
    },
    startX: {
      type: Number,
      value: 0
    },
    startY: {
      type: Number,
      value: 0
    },
    endX: {
      type: Number,
      value: 0
    },
    endY: {
      type: Number,
      value: 0
    },
    duration: {
      type: Number,
      value: 500
    },
    curvature: {
      type: Number,
      value: 0.005
    },
    useCss: {
      type: Boolean,
      value: true
    }
  },

  data: {
    group: []
  },

  attached () {
    this.count = 0
  },

  methods: {
    start (startX, startY, endX, endY) {
      const {
        duration, curvature, useCss
      } = this.data

      this.data.group.push({
        startX,
        startY,
        endX,
        endY,
        duration,
        curvature,
        useCss,
        unique: this.count++
      })

      this.setData({
        group: this.data.group
      })
    },
    onComplete () {
      const { group, startX, startY, endX, endY } = this.data
      group.shift()
      this.setData({
        group
      })
      this.triggerEvent('complete', {
        value: {offsetX: endX - startX, offsetY: endY - startY, startX, startY, endX, endY}
      })
    }
  }
})
