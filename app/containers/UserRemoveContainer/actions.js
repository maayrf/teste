import {
  REMOVE_USER,
  REMOVE_USER_ERROR,
  REMOVE_USER_SUCCESS,
} from './constants';

// USER_REMOVE_BUTTON LOAD

export function removeUser(id) {
  return {
    type: REMOVE_USER,
    id,
  };
}

export function userRemoved(id) {
  return {
    type: REMOVE_USER_SUCCESS,
    id,
  };
}

export function removeUserError(error) {
  return {
    type: REMOVE_USER_ERROR,
    error,
  };
}
// END USER_REMOVE_BUTTON LOAD
