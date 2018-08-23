import {
  LOAD_BRANCH_DETAILS,
  LOAD_BRANCH_DETAILS_ERROR,
  LOAD_BRANCH_DETAILS_SUCCESS,
  REMOVE_BRANCH_DETAILS,
  REMOVE_BRANCH_DETAILS_ERROR,
  REMOVE_BRANCH_DETAILS_SUCCESS,
  CREATE_BRANCH_DETAILS,
  CREATE_BRANCH_DETAILS_ERROR,
  CREATE_BRANCH_DETAILS_SUCCESS,
  EDIT_BRANCH_DETAILS,
  EDIT_BRANCH_DETAILS_ERROR,
  EDIT_BRANCH_DETAILS_SUCCESS,
} from './constants';

// BRENCH_DETAILS LOAD

export function loadBranchDetails(id) {
  return {
    type: LOAD_BRANCH_DETAILS,
    id,
  };
}

export function branchDetailsLoaded(branchDetails) {
  return {
    type: LOAD_BRANCH_DETAILS_SUCCESS,
    branchDetails,
  };
}

export function loadBranchDetailsError(error) {
  return {
    type: LOAD_BRANCH_DETAILS_ERROR,
    error,
  };
}
// END BRENCH_DETAILS LOAD

// CREATE BRENCH_DETAILS
export function createBranchDetails(branchDetails, resolve, reject) {
  return {
    type: CREATE_BRANCH_DETAILS,
    branchDetails,
    resolve,
    reject,
  };
}

export function createBranchDetailsError(error) {
  return {
    type: CREATE_BRANCH_DETAILS_ERROR,
    error,
  };
}

export function branchDetailsCreated(branchDetails) {
  return {
    type: CREATE_BRANCH_DETAILS_SUCCESS,
    branchDetails,
  };
}
// END CREATE BRENCH_DETAILS

// EDIT BRENCH_DETAILS
export function editBranchDetails(branchDetails, resolve, reject) {
  return {
    type: EDIT_BRANCH_DETAILS,
    branchDetails,
    resolve,
    reject,
  };
}

export function editBranchDetailsError(error) {
  return {
    type: EDIT_BRANCH_DETAILS_ERROR,
    error,
  };
}

export function branchDetailsEdited(branchDetails) {
  return {
    type: EDIT_BRANCH_DETAILS_SUCCESS,
    branchDetails,
  };
}
// END EDIT BRENCH_DETAILS

// REMOVE BRENCH_DETAILS
export function removeBranchDetails(id) {
  return {
    type: REMOVE_BRANCH_DETAILS,
    id,
  };
}

export function removeBranchDetailsError(error) {
  return {
    type: REMOVE_BRANCH_DETAILS_ERROR,
    error,
  };
}

export function branchDetailsRemoved(id) {
  return {
    type: REMOVE_BRANCH_DETAILS_SUCCESS,
    id,
  };
}

// END REMOVE BRENCH_DETAILS
