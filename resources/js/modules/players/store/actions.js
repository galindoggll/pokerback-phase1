/* ============
 * Actions for the article module
 * ============
 *
 * The actions that are available on the
 * article module.
 */

import {
  PLAYER_LIST,
  PLAYER_DETAIL,
  PLAYER_UPDATE,
  IMPORT_DATA,
} from './action-types';

export function list(payload) {
  return {
    type: PLAYER_LIST,
    payload
  }
}

export function detail(payload) {
  return {
    type: PLAYER_DETAIL,
    payload
  }
}

export function update(payload) {
  return {
    type: PLAYER_UPDATE,
    payload
  }
}

export function importData() {
  return {
    type: IMPORT_DATA
  }
}