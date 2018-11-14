import { createActions } from 'redux-actions'

export const {addCart, reduceCart, removeCart} = createActions({
  ADD_CART: ID => ({ ID }),
  REDUCE_CART: ID => ({ ID }),
  REMOVE_CART: ID => ({ ID })
})
