import fetch, { serverUrl } from '../service/fetch'

function isAuthorized () {
  return new Promise(resolve => {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          resolve(true)
        } else {
          resolve(false)
        }
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}

function login () {
  return new Promise((resolve, reject) => {
    wx.login({
      success (res) {
        if (res.code) {
          resolve(res.code)
        } else {
          reject(res.errMsg)
        }
      },
      fail () {
        reject('微信登录接口调用失败')
      }
    })
  })
}

function getUserInfo (options = {}) {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: options.withCredentials || false,
      lang: options.lang || 'en',
      success (res) {
        resolve(res)
      },
      fail () {
        reject('用户拒绝授权')
      }
    })
  })
}

function getOpenIdByCode (code) {
  return new Promise((resolve, reject) => {
    fetch.post('/user/weapp/login', { js_code: code }, false, false).then(res => {
      let info = {}
      info.openid = res.datas.openid
      if (res.datas.unionid) {
        info.unionid = res.datas.unionid
      }
      resolve(info)
    }, reject)
  })
}

function getWxUserInfo (openid, encryptedData, iv) {
  return fetch.post('/user/weapp/userinfo', { openid, encryptedData, iv }, false, false)
}

function getUserToken (openid, unionid, channel = 'weapp') {
  return fetch.post('/user/login', { openid, unionid, channel }, false, false)
}

function uploadFile (url, filePath, params, header) {
  wx.showLoading({
    mask: true,
    title: '上传中...'
  })

  let defHeaders = {'content-type': 'application/json'}

  for (let i in params) {
    params[i] = typeof params[i] !== 'string' ? JSON.stringify(params[i]) : params[i]
  }

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${serverUrl}api/${url}`,
      filePath: filePath,
      name: 'file',
      header: Object.assign(defHeaders, header),
      formData: params,
      success (res) {
        if (res.statusCode === 200) {
          let data = res.data
          resolve(data)
        } else {
          reject(res)
        }
      },
      fail () {
        reject('上传接口调用失败')
      },
      complete () {
        wx.hideLoading()
      }
    })
  })
}

module.exports = {isAuthorized, login, getUserInfo, getOpenIdByCode, getUserToken, getWxUserInfo, uploadFile}
