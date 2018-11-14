import { handleActions } from 'redux-actions'

function addProduct (list, product) {
  let item = list.find(item => item.goodsId === product.goodsId)
  if (!item) {
    list.push(product)
  }
  return list
}

const defaultState = {
  list: []
}

export default handleActions({
  ADD_PRODUCT (state, { payload: { product } }) {
    return {
      ...state,
      list: addProduct(state.list, product)
    }
  },
  ADD_PRODUCTS (state, { payload: { products } }) {
    return {
      ...state,
      list: [...state.list, ...products]
    }
  },
  CLEAR_CART (state, action) {
    return {
      ...state,
      list: []
    }
  }
}, defaultState)
