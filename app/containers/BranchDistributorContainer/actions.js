import {
  EDIT_BRANCH_DISTRIBUTORS,
  EDIT_BRANCH_DISTRIBUTORS_ERROR,
  EDIT_BRANCH_DISTRIBUTORS_SUCCESS,
  LOAD_BRANCH_DISTRIBUTORS,
  LOAD_BRANCH_DISTRIBUTORS_ERROR,
  LOAD_BRANCH_DISTRIBUTORS_SUCCESS,
} from './constants';

// BRANCH_DISTRIBUTOR LOAD
export function loadBranchDistributors(branchId) {
  return {
    type: LOAD_BRANCH_DISTRIBUTORS,
    branchId,
  };
}

export function branchDistributorsLoaded(branchDistributors) {
  return {
    type: LOAD_BRANCH_DISTRIBUTORS_SUCCESS,
    branchDistributors,
  };
}

export function loadBranchDistributorsError(error) {
  return {
    type: LOAD_BRANCH_DISTRIBUTORS_ERROR,
    error,
  };
}
// END BRANCH_DISTRIBUTOR LOAD

// BRANCH_DISTRIBUTOR EDIT
export function editBranchDistributor(branchDistributorData, resolve, reject) {
  return {
    type: EDIT_BRANCH_DISTRIBUTORS,
    branchDistributorData,
    resolve,
    reject,
  };
}

export function branchDistributorsEdited(branchDistributors) {
  return {
    type: EDIT_BRANCH_DISTRIBUTORS_SUCCESS,
    branchDistributors,
  };
}

export function editBranchDistributorsError(error) {
  return {
    type: EDIT_BRANCH_DISTRIBUTORS_ERROR,
    error,
  };
}
// END BRANCH_DISTRIBUTOR EDIT
