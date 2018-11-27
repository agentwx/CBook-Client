import { handleActions } from 'redux-actions'

const defaultState = {
  list: []
}

export default handleActions({
  ADD_CART_PRODUCTS (state, { payload: { products } }) {
    return {
      ...state,
      list: [...products]
    }
  },
  CLEAR_CART_PRODUCTS (state) {
    return {
      ...state,
      list: []
    }
  }
}, defaultState)
