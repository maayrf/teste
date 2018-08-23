import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_SUCCESS,
} from './constants';

export function forgetPassword(email) {
  return {
    type: FORGET_PASSWORD,
    email,
  };
}

export function forgetPasswordError(error) {
  return {
    type: FORGET_PASSWORD_ERROR,
    error,
  };
}

export function forgetPasswordSuccess() {
  return {
    type: FORGET_PASSWORD_SUCCESS,
  };
}
