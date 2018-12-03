import { handleActions } from 'redux-actions'

const defaultState = []

export default handleActions({
  ADD_CART_PRODUCTS (state, { payload: { products } }) {
    return [
      ...state,
      ...products
    ]
  },
  CLEAR_CART_PRODUCTS (state) {
    return []
  }
}, defaultState)
