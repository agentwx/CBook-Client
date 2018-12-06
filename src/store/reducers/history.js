import { handleActions } from 'redux-actions'

const MAX_LENGTH = 20

function addHistory (list, payload) {
  removeHistory(list, payload)
  list.unshift(payload)
  if (list.length > MAX_LENGTH) {
    list = list.slice(0, MAX_LENGTH)
  }
  return list
}

function removeHistory (list, payload) {
  let index = list.indexOf(payload)
  if (index > -1) {
    list.splice(index, 1)
  }
  return list
}

const defaultState = []

export default handleActions({
  ADD_HISTORY (state, { payload }) {
    return [
      ...addHistory(state, payload)
    ]
  },
  REMOVE_HISTORY (state, { payload }) {
    return [
      ...removeHistory(state, payload)
    ]
  },
  CLEAR_HISTORY () {
    return []
  }
}, defaultState)
