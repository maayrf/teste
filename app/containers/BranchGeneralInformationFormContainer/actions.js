import {
  REMOVE_BRANCH_GENERAL_INFORMATION,
  REMOVE_BRANCH_GENERAL_INFORMATION_ERROR,
  REMOVE_BRANCH_GENERAL_INFORMATION_SUCCESS,
  CREATE_BRANCH_GENERAL_INFORMATION,
  CREATE_BRANCH_GENERAL_INFORMATION_ERROR,
  CREATE_BRANCH_GENERAL_INFORMATION_SUCCESS,
  EDIT_BRANCH_GENERAL_INFORMATION,
  EDIT_BRANCH_GENERAL_INFORMATION_ERROR,
  EDIT_BRANCH_GENERAL_INFORMATION_SUCCESS,
} from './constants';

// CREATE BRANCH_GENERAL_INFORMATION_FORM
export function createBranchGeneralInformation(branchGeneralInformation) {
  return {
    type: CREATE_BRANCH_GENERAL_INFORMATION,
    branchGeneralInformation,
  };
}

export function createBranchGeneralInformationFormError(error) {
  return {
    type: CREATE_BRANCH_GENERAL_INFORMATION_ERROR,
    error,
  };
}

export function branchGeneralInformationCreated(branchGeneralInformation) {
  return {
    type: CREATE_BRANCH_GENERAL_INFORMATION_SUCCESS,
    branchGeneralInformation,
  };
}
// END CREATE BRANCH_GENERAL_INFORMATION_FORM

// EDIT BRANCH_GENERAL_INFORMATION_FORM
export function editBranchGeneralInformation(branchGeneralInformation) {
  return {
    type: EDIT_BRANCH_GENERAL_INFORMATION,
    branchGeneralInformation,
  };
}

export function editBranchGeneralInformationError(error) {
  return {
    type: EDIT_BRANCH_GENERAL_INFORMATION_ERROR,
    error,
  };
}

export function branchGeneralInformationEdited(branchGeneralInformation) {
  return {
    type: EDIT_BRANCH_GENERAL_INFORMATION_SUCCESS,
    branchGeneralInformation,
  };
}
// END EDIT BRANCH_GENERAL_INFORMATION_FORM

// REMOVE BRANCH_GENERAL_INFORMATION_FORM
export function removeBranchGeneralInformationForm(id) {
  return {
    type: REMOVE_BRANCH_GENERAL_INFORMATION,
    id,
  };
}

export function removeBranchGeneralInformationError(error) {
  return {
    type: REMOVE_BRANCH_GENERAL_INFORMATION_ERROR,
    error,
  };
}

export function branchGeneralInformationRemoved(id) {
  return {
    type: REMOVE_BRANCH_GENERAL_INFORMATION_SUCCESS,
    id,
  };
}

// END REMOVE BRANCH_GENERAL_INFORMATION_FORM
