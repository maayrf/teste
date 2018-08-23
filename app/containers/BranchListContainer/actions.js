import {
  LOAD_BRANCHES,
  LOAD_BRANCHES_ERROR,
  LOAD_BRANCHES_SUCCESS,
} from './constants';

// BRANCH LOAD

export function loadBranches(params) {
  return {
    type: LOAD_BRANCHES,
    params,
  };
}

export function branchesLoaded(branches, totalCount, limit, offset) {
  return {
    type: LOAD_BRANCHES_SUCCESS,
    branches,
    totalCount,
    limit,
    offset,
  };
}

export function loadBranchesError(error) {
  return {
    type: LOAD_BRANCHES_ERROR,
    error,
  };
}
// END BRANCH LOAD
