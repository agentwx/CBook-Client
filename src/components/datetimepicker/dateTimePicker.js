function padZero(param) {
  return param < 10 ? '0' + param : '' + param
}

function getLoopArray(start, end, suffix = '') {
  let array = []
  start = start || 0
  end = end || 1
  for (let i = start; i <= end; i++) {
    array.push(padZero(i) + suffix)
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

function dateTimePicker(startYear, endYear, date) {
  // 返回默认显示的数组和联动数组的声明
  let dateTime = []
  let dateTimeArray = [[], [], [], [], [], []]
  let start = startYear || 1978
  let end = endYear || 2100
  // 默认开始显示数据
  let defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNowDateArray()
  // 处理联动列表数据
  // 年月日 时分秒
  dateTimeArray[0] = getLoopArray(start, end)
  dateTimeArray[1] = getLoopArray(1, 12)
  dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1])
  dateTimeArray[3] = getLoopArray(0, 23)
  dateTimeArray[4] = getLoopArray(0, 59)
  dateTimeArray[5] = getLoopArray(0, 59)

  dateTimeArray.forEach((current, index) => {
    dateTime.push(current.indexOf(defaultDate[index]))
  })

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}

module.exports = {
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay
}
