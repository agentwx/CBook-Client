import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'

export default function configStore (initialState = {}) {
  const store = createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware))
  return store
}
