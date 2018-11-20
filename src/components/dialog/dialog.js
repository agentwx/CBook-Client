import {getCurrentPage} from '../../utils/util'

let queue = []

const Dialog = options => {
  return new Promise((resolve, reject) => {
    const context = options.context || getCurrentPage()
    const dialog = context.selectComponent(options.selector)
    delete options.selector

    if (dialog) {
      dialog.setData({
        onCancel: reject,
        onConfirm: resolve,
        ...options
      })
      queue.push(dialog)
    } else {
      console.warn('未找到 dialog 节点，请确认 selector 及 context 是否正确')
    }
  })
}

Dialog.defaultOptions = {
  show: true,
  title: '',
  message: '',
  zIndex: 100,
  overlay: true,
  asyncClose: false,
  selector: '#dialog',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: ''
}

Dialog.alert = options =>
  Dialog({
    ...Dialog.currentOptions,
    ...options
  })

Dialog.confirm = options =>
  Dialog({
    ...Dialog.currentOptions,
    showCancelButton: true,
    ...options
  })

Dialog.close = () => {
  queue.forEach(dialog => {
    dialog.close()
  })
  queue = []
}

Dialog.stopLoading = () => {
  queue.forEach(dialog => {
    dialog.stopLoading()
  })
}

Dialog.setDefaultOptions = options => {
  Object.assign(Dialog.currentOptions, options)
}

Dialog.resetDefaultOptions = () => {
  Dialog.currentOptions = {...Dialog.defaultOptions}
}

Dialog.resetDefaultOptions()

export default Dialog
