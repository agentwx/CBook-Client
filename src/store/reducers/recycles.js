import { handleActions } from 'redux-actions'

function addProduct (list, product) {
  let item = list.find(item => item.isbn === product.isbn)
  if (!item) {
    list.push(product)
  }
  return list
}

const defaultState = []

export default handleActions({
  ADD_RECYCLE (state, { payload: { product } }) {
    return [
      ...addProduct(state, product)
    ]
  },
  ADD_RECYCLES (state, { payload: { products } }) {
    return [
      ...state,
      ...products
    ]
  },
  CLEAR_RECYCLE (state) {
    return []
  }
}, defaultState)
