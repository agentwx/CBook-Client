import { handleActions } from 'redux-actions'

function addProduct (list, product) {
  let item = list.find(item => item.isbn === product.isbn)
  if (!item) {
    list.push(product)
  }
  return list
}

const defaultState = {
  list: []
}

export default handleActions({
  ADD_RECYCLE (state, { payload: { product } }) {
    return {
      ...state,
      list: addProduct(state.list, product)
    }
  },
  ADD_RECYCLES (state, { payload: { products } }) {
    return {
      ...state,
      list: [...state.list, ...products]
    }
  },
  CLEAR_RECYCLE (state) {
    return {
      ...state,
      list: []
    }
  }
}, defaultState)
