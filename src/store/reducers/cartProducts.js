import { handleActions } from 'redux-actions'

function addProducts (list, { product }) {
  let item = list.find(item => item.goodsId === product.goodsId)
  if (!item) {
    list.push(product)
  }
  return list
}

const defaultState = []

export default handleActions({
  ADD_CART_PRODUCT (state, { payload }) {
    return [
      ...addProducts(state, payload)
    ]
  },
  REMOVE_CART_PRODUCT (state, { payload: { ID } }) {
    return [
      ...state.filter(item => item.goodsId !== ID)
    ]
  },
  CLEAR_CART_PRODUCTS () {
    return []
  }
}, defaultState)
