import { handleActions } from 'redux-actions'

const defaultState = {
  avatarUrl: '',
  city: '',
  country: '',
  gender: 0,
  language: 'zh_CN',
  nickName: '',
  province: '',
  name: '',
  vipLevel: 0,
  starPoint: 0,
  mobile: ''
}

export default handleActions({
  ADD_USER_INFO (state, { payload: { data } }) {
    return {
      ...state,
      ...data
    }
  }
}, defaultState)
