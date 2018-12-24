import { handleActions } from 'redux-actions'

function addCart (list, { ID }) {
  let item = list.find(item => item.ID === ID)
  if (item) {
    item.COUNT++
  } else {
    list.push({COUNT: 1, ID})
  }
  return list
}

function reduceCart (list, { ID }) {
  let item = list.find(item => item.ID === ID)
  if (item) {
    item.COUNT--
    if (item.COUNT === 0) {
      list = list.filter(cart => cart.ID !== ID)
    }
  }
  return list
}

const defaultState = []

export default handleActions({
  ADD_CART (state, { payload }) {
    return [
      ...addCart(state, payload)
    ]
  },
  REDUCE_CART (state, { payload }) {
    return [
      ...reduceCart(state, payload)
    ]
  },
  REMOVE_CART (state, { payload: { ID } }) {
    return [
      ...state.filter(cart => cart.ID !== ID)
    ]
  },
  CLEAR_CART () {
    return []
  }
}, defaultState)
