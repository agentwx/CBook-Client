import { combineReducers } from 'redux'
import shopcart from './shopcart'
import products from './products'
import recycles from './recycles'

export default combineReducers({
  shopcart,
  products,
  recycles
})
