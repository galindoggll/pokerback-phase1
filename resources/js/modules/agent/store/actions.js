/* ============
 * Actions for the article module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  AGENT_LIST,
  AGENT_DETAIL,
  ASSIGN_PLAYERS,
  PLAYERS_LIST,
  UNASSIGN_PLAYER,
  AGENT_UPDATE,
} from './action-types';

export function list(payload) {
  return {
    type: AGENT_LIST,
    payload
  }
}

export function detail(payload) {
  return {
    type: AGENT_DETAIL,
    payload
  }
}

export function playerList(payload) {
  return {
    type: PLAYERS_LIST,
    payload
  }
}

export function assignPlayers(payload) {
  return {
    type: ASSIGN_PLAYERS,
    payload
  }
}

export function unassignPlayer(payload) {
  return {
    type: UNASSIGN_PLAYER,
    payload
  }
}

export function agentUpdate(payload) {
  return {
    type: AGENT_UPDATE,
    payload
  }
}
