import {
  LOAD_BRANCH_BY_ID,
  LOAD_BRANCH_BY_ID_ERROR,
  LOAD_BRANCH_BY_ID_SUCCESS,
} from './constants';

// Branch
export function loadBranchById(id, params) {
  return {
    type: LOAD_BRANCH_BY_ID,
    id,
    params,
  };
}

export function loadBranchByIdError(error) {
  return {
    type: LOAD_BRANCH_BY_ID_ERROR,
    error,
  };
}

export function branchByIdLoaded(branch) {
  return {
    type: LOAD_BRANCH_BY_ID_SUCCESS,
    branch,
  };
}
// END Branch
