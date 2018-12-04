
// 兼容浏览器和小程序环境
let window = typeof wx !== 'undefined' && !!wx.getSystemInfo ? {} : window

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    return setTimeout(callback, 1000 / 60)
  }

const cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  function (id) {
    return clearTimeout(id)
  }

function now() {
  return +new Date()
}

export default class Parabola {
  constructor(...args) {
    this.initialize.apply(this, args)
  }

  initialize(options) {
    this.options = {...defaultSetting, ...options}
    let opts = this.options
    this.timerId = null
    this.driftX = opts.endX - opts.startX
    this.driftY = opts.endY - opts.startY

    this.duration = opts.duration
    // 处理公式常量
    this.curvature = opts.curvature
    // 根据两点坐标以及曲率确定运动曲线函数（也就是确定a, b的值）
    // a=this.curvature
    /* 公式： y = a*x*x + b*x + c;
     */
    /*
     * 因为经过(0, 0), 因此c = 0
     * 于是：
     * y = a * x*x + b*x;
     * y1 = a * x1*x1 + b*x1;
     * y2 = a * x2*x2 + b*x2;
     * 利用第二个坐标：
     * b = (y2 - a*x2*x2) / x2
     */
    this.b = (this.driftY - this.curvature * this.driftX * this.driftX) / this.driftX

    if (opts.autoStart) {
      this.start()
    }
  }

  /**
   * 每一步执行
   * @param {Data} now 当前时间 .
   * @return {Object} this
   */
  step(now) {
    let opts = this.options
    let x
    let y
    if (now > this.end) {
      // 运行结束
      x = this.driftX
      y = this.driftY
      this.stop()
      if (typeof opts.complete === 'function') {
        opts.complete.call(this, x, y)
      }
    } else {
      // x 每一步的X轴的位置
      x = this.driftX * ((now - this.begin) / this.duration)
      // 每一步的Y轴的位置y = a*x*x + b*x + c;   c==0;
      y = this.curvature * x * x + this.b * x

      if (typeof opts.step === 'function') {
        opts.step.call(this, x, y)
      }
    }
    return this
  }

  setOptions(options = {}) {
    this.reset()
    this.options = {...this.options, ...options}
    this.initialize(this.options)
    return this
  }

  start() {
    let self = this
    // 设置起止时间
    this.begin = now()
    this.end = this.begin + this.duration
    if (this.driftX === 0 && this.driftY === 0) {
      // 原地踏步就别浪费性能了
      return
    }

    this.stop()

    let run = function () {
      self.timerId = requestAnimationFrame(run)
      self.step(now())
    }

    run()

    return this
  }

  reset(x = 0, y = 0) {
    this.stop()
    if (typeof this.options.step === 'function') {
      this.options.step.call(this, x, y)
    }
    return this
  }

  stop() {
    if (!!this.timerId) {
      cancelAnimationFrame(this.timerId)
    }
    return this
  }
}

const defaultSetting = {
  // 起始x坐标点
  startX: 0,
  // 起始y坐标点
  startY: 0,
  // 结束x坐标点
  endX: 0,
  // 结束y坐标点
  endY: 0,
  // 运动的时间，默认500毫秒
  duration: 500,
  // 是否自动开始，默认为false
  autoStart: false,
  // 抛物线曲率，就是弯曲的程度，越接近于0越像直线，默认0.001
  curvature: 0.005,
  // 运动后执行的回调函数
  complete: null,
  // 运动过程中执行的回调函数
  step: null
}
