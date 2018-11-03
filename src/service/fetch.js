import wepy from 'wepy'
import {toast} from '../utils/util'
import {session} from '../service/auth'

export const serverUrl = 'http://testsrv.kurite.cn/qs'

let requestCount = 0
let errorMsg = ''

let fetchApi = (url, params = {}, useToken = true, showLoading = true) => {
  return new Promise((resolve, reject) => {

    requestCount++
    errorMsg = ''

    if (requestCount === 1) {
      showLoading && wx.showLoading({
        mask: true,
        title: '请稍候...'
      })
    }

    let defHeaders = {'content-type': 'application/json'}
    let sessionInfo = session.get()

    if (useToken && sessionInfo && sessionInfo.token) {
      defHeaders = Object.assign(defHeaders, {
        'access-token': sessionInfo.token
      })
    }

    wepy.request({
      url: /^https?:\/\//.test(url) ? url : `${serverUrl}api/${url}`,
      data: Object.assign({}, params.data),
      method: params.method || 'GET',
      header: Object.assign(defHeaders, params.header)
    })
    .then(res => {
      if (res.statusCode === 200) {
        if (res.data.status === 'ok') {
          resolve(res.data)
        } else {
          reject(errorMsg = res.data.msg)
        }
      } else {
        reject(errorMsg = (res.data.msg || '服务器发生错误'))
      }
    })
    .catch(() => {
      reject(errorMsg = '与服务器连接失败')
    })
    .finally(() => {
      if (--requestCount === 0) {
        if (errorMsg) {
          toast.error(errorMsg)
        } else {
          showLoading && wx.hideLoading()
        }
        wx.stopPullDownRefresh()
      }
    })
  })
}

fetchApi.post = (url, params, useToken, showLoading) => {
  return fetchApi(url, {data: params, method: 'POST'}, useToken, showLoading)
}

fetchApi.get = (url, params, useToken, showLoading) => {
  return fetchApi(url, {data: params, method: 'GET'}, useToken, showLoading)
}

export default fetchApi
