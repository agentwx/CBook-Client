import { toast } from '../utils/util'
import {
  login, isAuthorized, getUserInfo,
  getWxUserInfo, getOpenIdByCode, getUserToken
} from '../utils/wechat'

const authorize = {
  appReady: false,
  readyCallback: null,
  init ({store}) {
    if (store) {
      this.store = store
    }
  },
  async launch () {
    try {
      const code = await login()
      const {openid, unionid} = await getOpenIdByCode(code)
      this.openId = openid
      if (unionid) {
        const tokenData = getUserToken(openid, unionid)
        this.saveToken(tokenData.datas.token)
      } else {
        this.doAuthorize()
      }
    } catch (msg) {
      toast.error(msg)
    }
  },

  async getUnionId () {
    try {
      const { encryptedData, iv } = await getUserInfo({withCredentials: true, lang: 'zh_CN'})
      const res = await getWxUserInfo(this.openId, encryptedData, iv)
      this.store.dispatch({
        type: 'ADD_USER_INFO',
        payload: {
          data: res.datas
        }
      })
      return res.datas
    } catch (errMsg) {
      toast.error(errMsg)
      return {}
    }
  },

  async getToken() {
    const { unionId } = await this.getUnionId()
    if (!unionId) {
      wx.showModal({
        content: '抱歉，未找到您的unionId',
        showCancel: false,
        success: res => {
          this.doAuthorize()
        }
      })
    } else {
      this.unionId = unionId
      this.requestToken()
    }
  },

  async requestToken () {
    const tokenData = await getUserToken(this.openId, this.unionId)
    this.saveToken(tokenData.datas.token)
  },

  async doAuthorize () {
    const isAuthored = await isAuthorized()
    if (isAuthored) {
      this.getToken()
    } else {
      wx.navigateTo({url: '/pages/auth/auth'})
    }
  },

  saveToken (token) {
    wx.setStorageSync('token', token)
    this.dispatchReady()
  },

  ready (callback) {
    this.readyCallback = callback
    if (this.appReady) {
      this.dispatchReady()
    }
  },

  dispatchReady () {
    this.appReady = true
    if (typeof this.readyCallback === 'function') {
      this.readyCallback.apply(this, arguments)
      this.readyCallback = null
    }
  }
}

export default authorize
