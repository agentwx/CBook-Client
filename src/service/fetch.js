import wepy from 'wepy'
import {toast} from '../utils/util'
import {session} from '../service/auth'

export const serverUrl = 'http://192.168.3.118:9001'

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

    let defHeaders = {'Content-Type': 'application/x-www-form-urlencoded'}

    if (useToken) {
      defHeaders = Object.assign(defHeaders, {
        token: 'c52c83dbd4924d139565d5ed226901f7'
      })
    }

    wepy.request({
      url: /^https?:\/\//.test(url) ? url : `${serverUrl}${url}`,
      data: JSON.stringify(Object.assign({}, params.data)),
      method: params.method || 'GET',
      header: Object.assign(defHeaders, params.header)
    })
    .then(res => {
      if (res.statusCode === 200) {
        if (res.data.code === 0) {
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
        //wx.stopPullDownRefresh()
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
