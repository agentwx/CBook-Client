import wepy from 'wepy'
import { toast, confirm, getCurrentPage, parseParams } from '../utils/util'

export const serverUrl = 'https://www.muyin.com/serverapi'

let requestCount = 0
let errorMsg = ''
let token = ''
let isTokenExpired = false

let fetchApi = (url, params = {}, showLoading = true, useToken = true) => {
  return new Promise((resolve, reject) => {

    requestCount++
    errorMsg = ''

    if (requestCount === 1) {
      showLoading && wx.showLoading({
        mask: true,
        title: '请稍候...'
      })
    }

    let defHeaders = {'Content-Type': 'application/json'}

    if (useToken) {
      defHeaders = Object.assign(defHeaders, {
        token: token || (token = wx.getStorageSync('token'))
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
          isTokenExpired = false
          resolve(res.data)
        } else {
          if (res.data.code === 98) {
            reject(res.data.msg)  // eslint-disable-line
            !isTokenExpired && confirm('登录信息过期，需要重新登录?').then(isOk => {
              if (isOk) {
                const currentPage = getCurrentPage()
                const lastPagePath = `/${currentPage.route}?${parseParams(currentPage.options)}`
                wx.setStorageSync('__lastPagePath', lastPagePath)
                wx.reLaunch({url: '/pages/home/home'})
              }
            })
            isTokenExpired = true
          } else {
            reject(errorMsg = res.data.msg)
          }
        }
      } else {
        reject(errorMsg = (res.data.msg || '服务器发生错误'))
      }
    })
    .catch(() => {
      reject(errorMsg = '与服务器连接失败') // eslint-disable-line
    })
    .finally(() => {
      if (--requestCount === 0) {
        if (errorMsg) {
          toast.error(errorMsg)
        } else {
          showLoading && wx.hideLoading()
        }
      }
    })
  })
}

fetchApi.post = (url, params, showLoading, useToken) => {
  return fetchApi(url, {data: params, method: 'POST'}, showLoading, useToken)
}

fetchApi.get = (url, params, showLoading, useToken) => {
  return fetchApi(url, {data: params, method: 'GET'}, showLoading, useToken)
}

export default fetchApi
