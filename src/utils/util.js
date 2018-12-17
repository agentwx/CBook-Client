function formatDate(source, format) {
  if (!source) return ''
  source = !(source instanceof Date)
    ? new Date(source.replace(/-/g, '/'))
    : source
  const o = {
    'M+': source.getMonth() + 1,
    'd+': source.getDate(),
    'H+': source.getHours(),
    'm+': source.getMinutes(),
    's+': source.getSeconds(),
    'q+': Math.floor((source.getMonth() + 3) / 3),
    'f+': source.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}

function parseDate(dateStr) {
  if (typeof dateStr === 'string') {
    dateStr = dateStr.replace(/-/g, '/')
  }
  return new Date(dateStr)
}

function dayAfter(target, offset = 0) {
  let now = parseDate(target)
  now.setDate(now.getDate() + offset)
  return now
}

function getNodeRect(selector, scope, all) {
  return new Promise(resolve => {
    let query = wx.createSelectorQuery()
    if (scope) {
      query = query.in(scope)
    }
    query[all ? 'selectAll' : 'select'](selector)
    .boundingClientRect(rect => {
      if (all && Array.isArray(rect) && rect.length) {
        resolve(rect)
      }
      if (!all) {
        resolve(rect)
      }
    })
    .exec()
  })
}

let CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

function uuid(len, radix) {
  var chars = CHARS,
    uuid = [],
    i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

function isObj(x) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

function confirm(msg, title = '', confirmText = '确定', cancelText = '取消') {
  return new Promise(resolve => {
    wx.showModal({
      title: title,
      content: msg,
      confirmColor: '#4b0',
      confirmText: confirmText,
      cancelText: cancelText,
      success: function (res) {
        if (res.confirm) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}

let toast = {}

toast.error = (msg, duration = 2000, image = '') => {
  return new Promise(resolve => {
    setTimeout(() => {
      wx.showToast({
        title: typeof msg === 'object' ? JSON.stringify(msg) : msg,
        icon: 'none',
        image: image,
        duration: duration
      })
      setTimeout(resolve, duration)
    }, 100)
  })
}

toast.success = (msg, duration = 2000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      wx.showToast({
        title: typeof msg === 'object' ? JSON.stringify(msg) : msg,
        duration: duration
      })
      setTimeout(resolve, duration)
    }, 100)
  })
}

function showLoading(title = '请稍候...', mask = true) {
  wx.showLoading({
    mask: mask,
    title: title
  })
}

function hideLoading() {
  wx.hideLoading()
}

function getPrevPage () {
  // eslint-disable-next-line
  const pages = getCurrentPages()
  return pages[pages.length - 2]
}

function getCurrentPage () {
  // eslint-disable-next-line
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

module.exports = {
  formatDate,
  parseDate,
  dayAfter,
  getNodeRect,
  uuid,
  confirm,
  toast,
  isObj,
  showLoading,
  hideLoading,
  getPrevPage,
  getCurrentPage
}
