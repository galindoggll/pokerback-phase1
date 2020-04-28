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