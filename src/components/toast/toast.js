import {isObj, getCurrentPage} from '../../utils/util'

const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  zIndex: 1000,
  duration: 3000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#toast'
}

let queue = []
let currentOptions = {...defaultOptions}

function parseOptions(message) {
  return isObj(message) ? message : {message}
}

let Toast = (options = {}) => {
  options = {
    ...currentOptions,
    ...parseOptions(options)
  }

  const context = options.context || getCurrentPage()
  const toast = context.selectComponent(options.selector)

  if (!toast) {
    console.warn('未找到 toast 节点，请确认 selector 及 context 是否正确')
    return
  }

  delete options.context
  delete options.selector

  queue.push(toast)
  toast.setData(options)
  clearTimeout(toast.timer)

  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear()
      queue = queue.filter(item => item !== toast)
    }, options.duration)
  }

  return toast
}

const createMethod = type => options => Toast({
  type, ...parseOptions(options)
})

['loading','success','fail'].forEach(method => {
  Toast[method] = createMethod(method)
})

Toast.clear = () => {
  queue.forEach(toast => {
    toast.clear()
  })
  queue = []
}

Toast.setDefaultOptions = options => {
  Object.assign(currentOptions, options)
}

Toast.resetDefaultOptions = () => {
  currentOptions = {...defaultOptions}
}

export default Toast
