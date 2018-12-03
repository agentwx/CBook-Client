import { combineReducers } from 'redux'
import shopcart from './shopcart'
import products from './products'
import recycles from './recycles'
import cartProducts from './cartProducts'
import userInfo from './userInfo'

export default combineReducers({
  shopcart,
  products,
  recycles,
  cartProducts,
  userInfo
})
