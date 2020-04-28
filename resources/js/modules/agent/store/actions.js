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