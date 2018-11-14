import { createActions } from 'redux-actions'
import products from '../reducers/products'

export const {addProduct, addProducts} = createActions({
  ADD_PRODUCT: PRODUCT => ({ PRODUCT }),
  ADD_PRODUCTS: PRODUCTS => ({PRODUCTS})
})
