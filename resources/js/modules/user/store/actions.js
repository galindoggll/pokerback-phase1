/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */

import {
  USER_UPDATE,
  USER_UNSET,
  GET_DETAILS,
} from './action-types';

export function userUpdate(payload) {
  return {
    type: USER_UPDATE,
    payload,
  };
}

export function unsetUser() {
  return {
    type: USER_UNSET,
  }
}

export function getDetails(payload) {
  return {
    type: GET_DETAILS,
    payload,
  }
}

