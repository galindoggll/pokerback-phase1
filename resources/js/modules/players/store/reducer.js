import {
  PLAYER_LIST,
  PLAYER_DETAIL,
  PLAYER_UPDATE,
  IMPORT_DATA,
} from './action-types'

const initialState = {
  currentPage: 0,
  playerDetail: {},
  data: [],
  from: 0,
  lastPage: 0,
  nextPageUrl: '',
  path: '',
  perPage: 0,
  prevPageUrl: null,
  to: 0,
  total: 0,
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case PLAYER_LIST:
      return list(state, payload)
    case PLAYER_DETAIL:
      return detail(state, payload)
    case PLAYER_UPDATE:
      return update(state, payload)
    case IMPORT_DATA:
      return importData(state)
    default:
      return state
  }
}

function list(state, payload) {
  state = Object.assign({}, payload)

  return state
}

function detail(state, payload) {
  return Object.assign({}, state, {
    ...state,
    playerDetail: payload
  });
}

function update(state, payload) {
  return Object.assign({}, state, {
    ...state,
    playerDetail: payload
  });
}

function importData(state) {
  return Object.assign({}, state, {
    ...state,
  });
}

export default reducer
