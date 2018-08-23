import {
  LOAD_USER_MAIL_AUTO_COMPLETES,
  LOAD_USER_MAIL_AUTO_COMPLETES_ERROR,
  LOAD_USER_MAIL_AUTO_COMPLETES_SUCCESS,
} from './constants';

// USER_MAIL_AUTO_COMPLETE LOAD

export function loadUserMailAutoCompletes(params) {
  return {
    type: LOAD_USER_MAIL_AUTO_COMPLETES,
    params,
  };
}

export function userMailAutoCompletesLoaded(users) {
  return {
    type: LOAD_USER_MAIL_AUTO_COMPLETES_SUCCESS,
    users,
  };
}

export function loadUserMailAutoCompletesError(error) {
  return {
    type: LOAD_USER_MAIL_AUTO_COMPLETES_ERROR,
    error,
  };
}
// END USER_MAIL_AUTO_COMPLETE LOAD
