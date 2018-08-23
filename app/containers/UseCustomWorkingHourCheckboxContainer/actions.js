import {
  EDIT_EGG_CUSTOM_WORKING_HOUR,
  EDIT_EGG_CUSTOM_WORKING_HOUR_ERROR,
  EDIT_EGG_CUSTOM_WORKING_HOUR_SUCCESS,
} from './constants';

// EDIT EGG_FORM
export function editEgg(eggForm, resolve, reject) {
  return {
    type: EDIT_EGG_CUSTOM_WORKING_HOUR,
    egg: eggForm,
    resolve,
    reject,
  };
}

export function editEggError(error) {
  return {
    type: EDIT_EGG_CUSTOM_WORKING_HOUR_ERROR,
    error,
  };
}

export function eggEdited(eggForm) {
  return {
    type: EDIT_EGG_CUSTOM_WORKING_HOUR_SUCCESS,
    egg: eggForm,
  };
}
// END EDIT EGG_FORM
