const {dateTimePicker, getMonthDay, getTimeRange, padZero} = require('./dateTimePicker')

function formatDate (dateArr) {
  let date = dateArr.slice(0, 3).join('-')
  let time = dateArr.slice(3).join(':')
  return `${date} ${time}`
}

function getDateIndex (startDate = '', endDate = '', stack, column, selectIndex) {
  let startStack = (startDate.split(' ')[0] || '').split('-')
  let endStack = (endDate.split(' ')[0] || '').split('-')
  let curValue = parseInt(stack[column][selectIndex])

  if (startDate && curValue < parseInt(startStack[column])) {
    return stack[column].indexOf(startStack[column])
  } else if (endDate && curValue > parseInt(endStack[column])) {
    return stack[column].indexOf(endStack[column])
  } else {
    return selectIndex
  }
}

function getTimeIndex (startTime = '', endTime = '', times, selectIndex) {
  let sIndex = times.indexOf(startTime.split(' ')[1])
  let eIndex = times.indexOf(endTime.split(' ')[1])

  eIndex = eIndex === -1 ? Number.MAX_VALUE : eIndex

  if (selectIndex < sIndex) {
    return sIndex
  } else if (selectIndex > eIndex) {
    return eIndex
  }

  return selectIndex
}

function getInitialTimeIndex (times, valueTime, startTime) {
  let index = 0
  let str

  if (valueTime && (str = valueTime.split(' ')[1])) {
    index = times.indexOf(str)
  } else if (startTime && (str = startTime.split(' ')[1])) {
    index = times.indexOf(str)
  } else {
    let hourNow = padZero(new Date().getHours())
    for (let i = 0; i < times.length; i++) {
      if (times[i].indexOf(hourNow) === 0) {
        return i
      }
    }
  }
  return index
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
      value: 2100
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
    suffix: {
      type: Array,
      value: ['年', '月', '日', '时', '分', '秒']
    }
  },
  data: {
    range: [],
    rangeArrayDisplay: []
  },
  attached: function () {
    if (this.data.mode === 'datetime') {

      const {
        startYear, endYear, value, start, suffix,
        fields, timeRange, timeStep, timeHalf
      } = this.data

      const {range, rangeArray} = dateTimePicker(startYear, endYear, value, start, fields)

      if (fields === 'range') {
        const times = getTimeRange(timeRange[0], timeRange[1], timeStep, timeHalf)
        rangeArray.push(times)
        range.push(getInitialTimeIndex(times, value, start))
        suffix[3] = ''
      }

      let rangeArrayDisplay = []

      rangeArray.forEach((items, index) => {
        rangeArrayDisplay.push(items.map(item => item + suffix[index]))
      })

      this.rangeArray = rangeArray

      this.setData({
        range,
        rangeArrayDisplay
      })
    } else {
      this.setData({
        range: this.data.value
      })
    }
  },
  methods: {
    change (e) {
      this.setData({range: e.detail.value})

      let value = null
      if (this.data.mode === 'datetime') {
        let date = this.data.range.map((item, index) => {
          return this.rangeArray[index][item]
        })
        value = {
          ...e.detail,
          value: this.data.range,
          date: formatDate(date),
          range: this.rangeArray
        }
      } else {
        value = e.detail
      }

      this.triggerEvent('change', value)
    },
    columnChange (e) {
      if (this.data.mode !== 'datetime') {
        return this.triggerEvent('columnchange', e.detail)
      }

      let selectIndex = e.detail.value
      let start = this.data.start
      let end = this.data.end
      let column = e.detail.column
      let rangeOrig = this.data.range.slice()
      let range = this.data.range
      let rangeArray = this.rangeArray
      let rangeArrayDisplay = this.data.rangeArrayDisplay

      if (column < 3) {
        range[column] = getDateIndex(start, end, rangeArray, column, selectIndex)
      } else {
        range[column] = getTimeIndex(start, end, rangeArray[3], selectIndex)
      }

      if (column === 0) {
        rangeArray[2] = getMonthDay(rangeArray[0][range[0]], rangeArray[1][range[1]])
        rangeArrayDisplay[2] = rangeArray[2].map(date => date + this.data.suffix[2])
      }

      this.setData({
        range,
        rangeArrayDisplay
      })

      let date = range.map((item, index) => {
        return this.rangeArray[index][item]
      })

      if (rangeOrig[column] !== range[column]) {
        this.triggerEvent('columnchange', {
          ...e.detail,
          values: this.data.range,
          date: formatDate(date),
          range: this.rangeArray
        })
      }
    },
    cancel (e) {
      this.triggerEvent('cancel', e.detail)
    },
    setValue (value) {
      this.setData({
        range: value
      })
    }
  },
  getMonthDay,
  getTimeRange
})
