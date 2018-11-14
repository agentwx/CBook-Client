import { combineReducers } from 'redux'
import shopcart from './shopcart'
import products from './products'

export default combineReducers({
  shopcart,
  products
})
