import {
  REMOVE_EGG,
  REMOVE_EGG_ERROR,
  REMOVE_EGG_SUCCESS,
  CREATE_EGG,
  CREATE_EGG_ERROR,
  CREATE_EGG_SUCCESS,
  EDIT_EGG,
  EDIT_EGG_ERROR,
  EDIT_EGG_SUCCESS,
} from './constants';

// CREATE EGG_FORM
export function createEgg(eggForm, resolve, reject) {
  return {
    type: CREATE_EGG,
    egg: eggForm,
    resolve,
    reject,
  };
}

export function createEggFormError(error) {
  return {
    type: CREATE_EGG_ERROR,
    error,
  };
}

export function eggFormCreated(eggForm) {
  return {
    type: CREATE_EGG_SUCCESS,
    egg: eggForm,
  };
}
// END CREATE EGG_FORM

// EDIT EGG_FORM
export function editEgg(eggForm, resolve, reject) {
  return {
    type: EDIT_EGG,
    egg: eggForm,
    resolve,
    reject,
  };
}

export function editEggError(error) {
  return {
    type: EDIT_EGG_ERROR,
    error,
  };
}

export function eggEdited(eggForm) {
  return {
    type: EDIT_EGG_SUCCESS,
    egg: eggForm,
  };
}
// END EDIT EGG_FORM

// REMOVE EGG_FORM
export function removeEggForm(id) {
  return {
    type: REMOVE_EGG,
    id,
  };
}

export function removeEggError(error) {
  return {
    type: REMOVE_EGG_ERROR,
    error,
  };
}

export function eggRemoved(id) {
  return {
    type: REMOVE_EGG_SUCCESS,
    id,
  };
}

// END REMOVE EGG_FORM
