import { handleActions } from 'redux-actions'

function addProduct (list, product) {
  let item = list.find(item => item.goodsId === product.goodsId)
  if (!item) {
    list.push(product)
  }
  return list
}

const defaultState = []

export default handleActions({
  ADD_PRODUCT (state, { payload: { product } }) {
    return [
      ...addProduct(state, product)
    ]
  },
  ADD_PRODUCTS (state, { payload: { products } }) {
    return [
      ...state,
      ...products
    ]
  },
  CLEAR_PRODUCTS (state) {
    return []
  }
}, defaultState)
