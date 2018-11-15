import { createActions } from 'redux-actions'

export const {addProduct, addProducts} = createActions({
  ADD_PRODUCT: PRODUCT => ({ PRODUCT }),
  ADD_PRODUCTS: PRODUCTS => ({PRODUCTS})
})
