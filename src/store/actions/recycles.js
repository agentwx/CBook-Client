import { createActions } from 'redux-actions'

export const {addRecycle, addRecycles} = createActions({
  ADD_RECYCLE: PRODUCT => ({ PRODUCT }),
  ADD_RECYCLES: PRODUCTS => ({PRODUCTS})
})
