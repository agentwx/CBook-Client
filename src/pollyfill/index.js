'use strict'

if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (onResolveOrReject) {
    return this.catch(function (result) {
      return result
    }).then(onResolveOrReject)
  }
}

if (!Promise.queue) {
  Promise.queue = function (queue) {
    'use strict'
    if (!Array.isArray(queue)) {
      throw new TypeError('arguments must be a array')
    }
    var queueIndex = 0
    var returnPool = []
    var queueHandler = function (resolve, reject) {
      if (queueIndex > queue.length - 1) {
        return resolve(returnPool)
      }
      var callFun = queue[queueIndex]
      if (!(callFun instanceof Function)) {
        reject('argument ' + queueIndex + ' is not a Function')
      } else {
        var promise = callFun()
        if (!(promise instanceof Promise)) {
          reject('argument ' + queueIndex + ' is not return a Promise instance')
        } else {
          promise.then(function (res) {
            queueIndex++
            returnPool.push(res)
            queueHandler(resolve, reject)
          }, function (obj) {
            reject(obj)
          })
        }
      }
    }
    return new Promise(queueHandler)
  }
}

if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
    'use strict'
    if (target === null) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    target = Object(target)
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index]
      if (source !== null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
    }
    return target
  }
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this === null) {
        throw new TypeError('"this" is null or not defined')
      }

      var o = Object(this)

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }

      // 4. If thisArg was supplied, let T be thisArg else let T be undefined.
      var thisArg = arguments[1]

      // 5. Let k be 0.
      var k = 0

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue
        }
        // e. Increase k by 1.
        k++
      }

      // 7. Return undefined.
      return undefined
    }
  })
}

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this === null) {
        throw new TypeError('"this" is null or not defined')
      }

      var o = Object(this)

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }

      // 4. If thisArg was supplied, let T be thisArg else let T be undefined.
      var thisArg = arguments[1]

      // 5. Let k be 0.
      var k = 0

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return k
        }
        // e. Increase k by 1.
        k++
      }

      // 7. Return undefined.
      return -1
    }
  })
}

if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length

    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object')

      var result = []

      for (var prop in obj) {
        if (hasOwnProperty.call(obj, prop)) result.push(prop)
      }

      if (hasDontEnumBug) {
        for (var i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i])
        }
      }
      return result
    }
  })()
}

if (!Object.values) {
  Object.values = function (obj) {
    if (obj !== Object(obj))
      throw new TypeError('Object.values called on a non-object')
    var val = [], key
    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        val.push(obj[key])
      }
    }
    return val
  }
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    var k
    if (this == null) {
      throw new TypeError('"this" is null or not defined')
    }

    var O = Object(this)
    var len = O.length >>> 0

    if (len === 0) {
      return -1
    }

    var n = +fromIndex || 0

    if (Math.abs(n) === Infinity) {
      n = 0
    }

    if (n >= len) {
      return -1
    }

    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

    while (k < len) {
      if (k in O && O[k] === searchElement) {
        return k
      }
      k++
    }
    return -1
  }
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function () {
    return this.indexOf.apply(this, arguments) > -1
  }
}

if (!Array.prototype.some) {
  Array.prototype.some = function (fun/*, thisArg*/) {
    if (this == null) {
      throw new TypeError('Array.prototype.some called on null or undefined')
    }

    if (typeof fun !== 'function') {
      throw new TypeError()
    }

    var t = Object(this)
    var len = t.length >>> 0

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true
      }
    }

    return false
  }
}

if (!Array.prototype.every) {
  Array.prototype.every = function (fun /*, thisArg */) {
    if (this === void 0 || this === null)
      throw new TypeError()

    var t = Object(this)
    var len = t.length >>> 0
    if (typeof fun !== 'function')
      throw new TypeError()

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0
    for (var i = 0; i < len; i++) {
      if (i in t && !fun.call(thisArg, t[i], i, t))
        return false
    }

    return true
  }
}

if (!Array.isArray) {
  Array.isArray = function (array) {
    return Object.prototype.toString.call(array) === "[object Array]"
  }
}

if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    if (this === null) {
      throw new TypeError('can\'t convert ' + this + ' to object')
    }
    var str = '' + this
    count = +count
    if (count !== count) {
      count = 0
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative')
    }
    if (count === Infinity) {
      throw new RangeError('repeat count must be less than infinity')
    }
    count = Math.floor(count)
    if (str.length === 0 || count === 0) {
      return ''
    }
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size')
    }
    var rpt = ''
    for (var i = 0; i < count; i++) {
      rpt += str
    }
    return rpt
  }
}
