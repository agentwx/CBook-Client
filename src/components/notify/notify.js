import { isObj, getCurrentPage } from '../../utils/util'

const defaultOptions = {
  selector: '#notify',
  duration: 3000
}

function parseOptions(text) {
  return isObj(text) ? text : {text}
}

export default function Notify(options) {
  options = Object.assign({}, defaultOptions, parseOptions(options))

  const context = options.context || getCurrentPage()
  const notify = context.selectComponent(options.selector)
  delete options.selector

  if (notify) {
    notify.setData(options)
    notify.show()
  } else {
    console.warn('未找到 notify 节点，请确认 selector 及 context 是否正确')
  }
}
