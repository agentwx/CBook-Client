const {dateTimePicker, getMonthDay, getTimeRange, padZero} = require('./dateTimePicker')

function formateDate(dateArr) {
  let date = dateArr.slice(0, 3).join('-')
  let time = dateArr.slice(3).join(':')
  return `${date} ${time}`
}

Component({
  properties: {
    mode: {
      type: String,
      value: 'datetime'
    },
    fields: {
      type: String,
      value: 'second'
    },
    startYear: {
      type: Number,
      value: 1900
    },
    endYear: {
      type: Number,
      value: 2200
    },
    value: String,
    start: String,
    end: String,
    rangeKey: String,
    disabled: {
      type: Boolean,
      value: false
    },
    timeRange: {
      type: Array,
      value: [0, 24]
    },
    timeStep: {
      type: Number,
      value: 1
    },
    timeHalf: {
      type: Boolean,
      value: false
    },
    timeOffset: {
      type: Number,
      value: 0
    },
    suffix: {
      type: Array,
      value: ['年', '月', '日', '时', '分', '秒']
    }
  },
  data: {
    dateTime: [],
    dateTimeArrayDisplay: []
  },
  lifetimes: {
    ready: function () {
      if (this.data.mode === 'datetime') {

        const {
          startYear, endYear, value, suffix,
          fields, timeRange, timeStep, timeHalf, timeOffset
        } = this.data

        const {dateTime, dateTimeArray} = dateTimePicker(startYear, endYear, value, fields)

        if (fields === 'range') {
          const times = getTimeRange(timeRange[0], timeRange[1], timeStep, timeHalf)
          dateTimeArray.push(times)
          dateTime.push(this.getTimeIndex(times) + timeOffset)
          suffix[3] = ''
        }

        let dateTimeArrayDisplay = []

        dateTimeArray.forEach((items, index) => {
          dateTimeArrayDisplay.push(items.map(item => item + suffix[index]))
        })

        this.dateTimeArray = dateTimeArray

        this.setData({
          dateTime: dateTime,
          dateTimeArrayDisplay: dateTimeArrayDisplay
        })
      } else {
        this.setData({
          dateTime: this.data.value
        })
      }
    }
  },
  methods: {
    getTimeIndex (times) {
      let hourNow = padZero(new Date().getHours())
      for (let i = 0; i < times.length; i++) {
        if (times[i].indexOf(hourNow) === 0) {
          return i
        }
      }
      return 0
    },
    change (e) {
      this.setData({dateTime: e.detail.value})

      let value = null
      if (this.data.mode === 'datetime') {
        value = this.data.dateTime.map((item, index) => this.dateTimeArray[index][item])
        value = {...e.detail, value: formateDate(value)}
      } else {
        value = e.detail
      }

      this.triggerEvent('change', value)
    },
    changeColumn (e) {
      let colIndex = e.detail.column
      let array = this.data.dateTime
      let dateArr = this.dateTimeArray
      let dateArrDisplay = this.data.dateTimeArrayDisplay

      array[colIndex] = e.detail.value

      if (colIndex === 0) {
        dateArr[2] = getMonthDay(dateArr[0][array[0]], dateArr[1][array[1]])
        dateArrDisplay[2] = dateArr[2].map(date => date + this.data.suffix[2])
      }

      this.setData({
        dateTimeArrayDisplay: dateArrDisplay,
        dateTime: array
      })

      let datetime = dateArr[colIndex][e.detail.value]
      this.triggerEvent('changeColumn', {...e.detail, datetime})
    },
    cancel (e) {
      this.triggerEvent('cancel', e.detail)
    }
  },
  getMonthDay,
  getTimeRange
})
