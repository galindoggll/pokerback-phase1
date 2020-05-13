import {
  AGENT_LIST,
  AGENT_DETAIL,
  ASSIGN_PLAYERS,
  PLAYERS_LIST,
} from './action-types'

const initialState = {
  currentPage: 0,
  agent: {},
  agents: {},
  data: [],
  from: 0,
  lastPage: 0,
  nextPageUrl: '',
  path: '',
  perPage: 0,
  prevPageUrl: null,
  to: 0,
  total: 0,
  userAgent: {},
  playerList: [],
  unassignedList: [],
}

const reducer = (state = initialState, { type, payload = null }) => {
  switch(type) {
    case AGENT_LIST:
      return list(state, payload)
    case AGENT_DETAIL:
      return detail(state, payload)
    case ASSIGN_PLAYERS:
      return assignPlayers(state, payload)
    case PLAYERS_LIST:
      return playersList(state, payload)
    default:
      return state
  }
}

function list(state, payload) {
  state = Object.assign({}, payload)

  return state
}

function detail(state, payload) {
  let playerList = [];
  if (payload.info[0] && payload.info[0].player) {
    playerList = payload.info[0].player
  }
  return Object.assign({}, state, {
    ...state,
    agent: payload.info[0],
    userAgent: payload.user,
    playerList: playerList,
  });
}

function playersList(state, payload) {
  return Object.assign({}, state, {
    ...state,
    unassignedList: payload[0]
  });
}

function assignPlayers(state, payload) {
  console.log(payload);
  let playerList = [];
  if (payload.info[0] && payload.info[0].player) {
    playerList = payload.info[0].player
  }
  return Object.assign({}, state, {
    ...state,
    agent: payload.info[0],
    playerList: playerList,
  });
}

export default reducer
