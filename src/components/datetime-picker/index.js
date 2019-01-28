import computedBehavior from 'miniprogram-computed'
import { dateTimePicker, getMonthDay, getTimeRange, padZero } from './dateTimePicker'
import { parseDate } from '../../utils/util'

function formatDate (dateArr) {
  let date = dateArr.slice(0, 3).join('-')
  let time = dateArr.slice(3).join(':')
  return `${date} ${time}`
}

function makeDateArgsFromArray (array) {
  array = Array.from({length: 6}).map((item, i) => {
    return array[i] || (i < 3 ? '01' : '00')
  })
  return array.slice(0, 3).join('/') + " " + array.slice(3).join(':')
}

function makeDateStringToArray (str) {
  let strArray = str.split(' ')
  let dateArray = strArray[0].split('-')
  let timeArray = (strArray[1]||'').split(':')
  return [...dateArray, ...timeArray]
}

function makeDateArgsFromString (str) {
  return makeDateArgsFromArray(makeDateStringToArray(str))
}

function getDateIndex (start = '', end = '', range, rangeArray, column, selectIndex) {
  range[column] = selectIndex

  let value = range.map((item, index) => rangeArray[index][item])
  value = new Date(makeDateArgsFromArray(value))

  if (start) {
    let startDate = new Date(makeDateArgsFromString(start))
    let startStack = makeDateStringToArray(start)
    if (value < startDate) {
      return rangeArray[column].indexOf(startStack[column])
    }
  }

  if (end) {
    let endDate = new Date(makeDateArgsFromString(end))
    let endStack = makeDateStringToArray(end)
    if (value > endDate) {
      return rangeArray[column].indexOf(endStack[column])
    }
  }

  return selectIndex
}

function getDateRangeIndex (start = '', end = '', range, rangeArray, column, selectIndex) {
  range[column] = selectIndex
  range.pop() // 去掉时分的比较

  let value = range.map((item, index) => rangeArray[index][item])
  value = new Date(value.join('/'))

  if (start) {
    start = start.split(' ')[0]
    let startDate = parseDate(start)
    let startStack = start.split('-')
    if (value < startDate) {
      return rangeArray[column].indexOf(startStack[column])
    }
  }

  if (end) {
    end = end.split(' ')[0]
    let endDate = parseDate(end)
    let endStack = start.split('-')
    if (value > endDate) {
      return rangeArray[column].indexOf(endStack[column])
    }
  }

  return selectIndex
}

function getTimeRangeIndex (startTime = '', endTime = '', range, rangeArray, column, selectIndex) {
  range.pop() // 去掉时分的比较

  let times = rangeArray[3]
  let value = range.map((item, index) => rangeArray[index][item])
  value = new Date(value.join('/')).getTime()

  let sDate = parseDate(startTime.split(' ')[0])
  let sIndex = times.indexOf(startTime.split(' ')[1])
  let eDate = parseDate(endTime.split(' ')[0])
  let eIndex = times.indexOf(endTime.split(' ')[1])

  eIndex = eIndex === -1 ? Number.MAX_VALUE : eIndex

  if (value <= sDate && selectIndex < sIndex) {
    return sIndex
  }

  if (value >= eDate && selectIndex > eIndex) {
    return eIndex
  }

  return selectIndex
}

function getInitTimeIndex (times, valueTime, startTime) {
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
    size: {
      type: String,
      value: 'normal'
    },
    placeholder: String,
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
    value: {
      type: [String, Array],
      value: []
    },
    range: {
      type: Array,
      value: []
    },
    start: String,
    end: String,
    rangeKey: String,
    disabled: {
      type: [Boolean, String],
      value: false
    },
    bordered: {
      type: [Boolean, String],
      value: true
    },
    resetable: {
      type: [Boolean, String],
      value: false
    },
    useSlot: {
      type: [Boolean, String],
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
    date: '',
    range: [],
    rangeArrayDisplay: []
  },
  computed: {
    isDisabled () {
      return coerce(this.data.disabled)
    },
    isBordered () {
      return coerce(this.data.bordered)
    },
    isUseSlot () {
      return coerce(this.data.useSlot)
    },
    isResetable () {
      return coerce(this.data.resetable)
    }
  },
  ready () {
    this.init()
  },
  methods: {
    init () {
      if (this.data.mode === 'datetime') {
        const {
          startYear, endYear, value, start, suffix,
          fields, timeRange, timeStep, timeHalf
        } = this.data

        const { range, rangeArray } = dateTimePicker(startYear, endYear, value, start, fields)

        if (fields === 'range') {
          const times = getTimeRange(timeRange[0], timeRange[1], timeStep, timeHalf)
          rangeArray.push(times)
          range.push(getInitTimeIndex(times, value, start))
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
          range: this.data.value,
          rangeArrayDisplay: this.data.range
        })
      }
    },
    change (e) {
      let range = e.detail.value
      let value = null
      if (this.data.mode === 'datetime') {
        let date = range.map((item, index) => {
          return this.rangeArray[index][item]
        })
        date = formatDate(date)
        value = {
          ...e.detail,
          range,
          date,
          data: this.rangeArray
        }
        this.setData({ range, date })
      } else {
        value = range.map((item, index) => {
          return this.data.rangeArrayDisplay[index][item]
        })
        value = {
          ...e.detail,
          date: value.join(' '),
          data: this.data.rangeArrayDisplay
        }
        this.setData({ range, date: range })
      }

      this.triggerEvent('change', value)
    },
    columnChange (e) {
      if (this.data.mode !== 'datetime') {
        return this.triggerEvent('columnchange', e.detail)
      }

      let selectIndex = e.detail.value
      let fields = this.data.fields
      let start = this.data.start
      let end = this.data.end
      let column = e.detail.column
      let suffix = this.data.suffix
      let rangeOrig = this.data.range.slice()
      let range = this.data.range
      let rangeArray = this.rangeArray
      let rangeArrayDisplay = this.data.rangeArrayDisplay

      if (fields === 'range') {
        if (column < 3) {
          range[column] = getDateRangeIndex(start, end, range.slice(), rangeArray, column, selectIndex)
        } else {
          range[column] = getTimeRangeIndex(start, end, range.slice(), rangeArray, column, selectIndex)
        }
      } else {
        range[column] = getDateIndex(start, end, range.slice(), rangeArray, column, selectIndex)
      }

      if (column === 0) {
        // 计算是否润年所对应当前月份的天数
        rangeArray[2] = getMonthDay(rangeArray[0][range[0]], rangeArray[1][range[1]])
        rangeArrayDisplay[2] = rangeArray[2].map(date => date + suffix[2])
      }

      this.setData({
        range,
        rangeArrayDisplay
      })

      let date = range.map((item, index) => {
        return rangeArray[index][item]
      })

      if (rangeOrig[column] !== range[column]) {
        this.triggerEvent('columnchange', {
          ...e.detail,
          range: this.data.range,
          date: formatDate(date),
          data: rangeArray
        })
      }
    },
    reset () {
      let value = {value: [], range: [], date: ''}
      this.setData(value)
      this.triggerEvent('change', {...value, data: this.rangeArray})
    },
    cancel (e) {
      this.triggerEvent('cancel', e.detail)
    },
    setRange (range) {
      this.setData({
        range
      })
    }
  },
  getMonthDay,
  getTimeRange
})
