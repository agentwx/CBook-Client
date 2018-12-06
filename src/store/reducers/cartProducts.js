import { handleActions } from 'redux-actions'

function addProduct (list, { product }) {
  let item = list.find(item => item.goodsId === product.goodsId)
  if (!item) {
    list.push(product)
  }
  return list
}

function toggleProduct (list, ID, checked) {
  return list.map(item => (
      {...item, checked: (ID && item.goodsId === ID) || !ID ? checked : item.checked}
    ))
}

const defaultState = []

export default handleActions({
  ADD_CART_PRODUCT (state, { payload }) {
    return [
      ...addProduct(state, payload)
    ]
  },
  REMOVE_CART_PRODUCT (state, { payload: { ID } }) {
    return [
      ...state.filter(item => item.goodsId !== ID)
    ]
  },
  TOGGLE_CART_PRODUCT (state, { payload: { ID, checked } }) {
    return [
      ...toggleProduct(state, ID, checked)
    ]
  },
  CLEAR_CART_PRODUCTS () {
    return []
  }
}, defaultState)
