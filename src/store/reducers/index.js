import { combineReducers } from 'redux'
import shopcart from './shopcart'
import recycles from './recycles'
import cartProducts from './cartProducts'
import userInfo from './userInfo'

export default combineReducers({
  shopcart,
  recycles,
  cartProducts,
  userInfo
})
