function padZero(n) {
  return n < 10 ? '0' + n : '' + n
}

function getLoopArray(start, end) {
  let array = []
  start = start || 0
  end = end || 1
  for (let i = start; i <= end; i++) {
    array.push(padZero(i))
  }
  return array
}

function fixEnd(end) {
  return end === 24 ? '00' : padZero(end)
}

function getTimeRange(start = 0, end = 24, step = 1, isHalf = false) {
  let array = []
  const len = (end - start) / step
  const r = isHalf ? ':30' : ''

  for (let i = 0; i < len; i++) {
    let s = padZero(start)
    let e = (start + step) >= end ? fixEnd(end) : padZero(start + step)
    if (isHalf) {
      array.push(`${s}:00-${s + r}`, `${s + r}-${e}:00`)
    } else {
      array.push(`${s}:00-${e}:00`)
    }
    start += step
  }

  return array
}

function getMonthDay(year, month) {
  let array = null

  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      array = getLoopArray(1, 31)
      break
    case '04':
    case '06':
    case '09':
    case '11':
      array = getLoopArray(1, 30)
      break
    case '02':
      let isLeapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0) // 是否闰年
      array = getLoopArray(1, isLeapYear ? 29 : 28)
      break
    default:
      array = 'invalid month format'
  }
  return array
}

function getNowDateArray() {
  let newDate = new Date()
  let year = padZero(newDate.getFullYear())
  let month = padZero(newDate.getMonth() + 1)
  let date = padZero(newDate.getDate())
  let hour = padZero(newDate.getHours())
  let minu = padZero(newDate.getMinutes())
  let seco = padZero(newDate.getSeconds())

  return [year, month, date, hour, minu, seco]
}

function getDateStack (dateStr) {
  let stack = dateStr.split(' ')
  if (stack.length > 1) {
    return [...stack[0].split('-'), ...stack[1].split(':')]
  } else {
    return [...stack[0].split('-'), ...['00', '00', '00']]
  }
}

function dateTimePicker(startYear = 1900, endYear = 2100, valueDate, startDate, field = 'second') {
  // 返回默认显示的数组和联动数组的声明
  let range = []
  let rangeArray = []
  // 默认开始显示数据
  let initDate = valueDate ? getDateStack(valueDate) : (
    startDate
        ? getDateStack(startDate)
        : getNowDateArray()
      )
  // 处理联动列表数据
  // 年月日 时分秒
  rangeArray[0] = getLoopArray(startYear, endYear)
  rangeArray[1] = getLoopArray(1, 12)
  rangeArray[2] = getMonthDay(initDate[0], initDate[1])
  if (field === 'hour') {
    rangeArray[3] = getLoopArray(0, 23)
  } else if (field === 'minute') {
    rangeArray[3] = getLoopArray(0, 23)
    rangeArray[4] = getLoopArray(0, 59)
  } else if (field === 'second') {
    rangeArray[3] = getLoopArray(0, 23)
    rangeArray[4] = getLoopArray(0, 59)
    rangeArray[5] = getLoopArray(0, 59)
  }

  rangeArray.forEach((current, index) => {
    range.push(current.indexOf(initDate[index]))
  })

  return {
    rangeArray,
    range
  }
}

module.exports = {
  dateTimePicker,
  getMonthDay,
  getTimeRange,
  padZero
}
