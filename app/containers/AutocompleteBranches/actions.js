import {
  LOAD_AUTOCOMPLETE_BRANCHES,
  LOAD_AUTOCOMPLETE_BRANCHES_ERROR,
  LOAD_AUTOCOMPLETE_BRANCHES_SUCCESS,
} from './constants';

// AUTOCOMPLETE_BRANCHES LOAD

export function loadAutocompleteBranches(params) {
  return {
    type: LOAD_AUTOCOMPLETE_BRANCHES,
    params,
  };
}

export function autocompleteBranchesLoaded(listBranches) {
  return {
    type: LOAD_AUTOCOMPLETE_BRANCHES_SUCCESS,
    listBranches,
  };
}

export function loadAutocompleteBranchesError(error) {
  return {
    type: LOAD_AUTOCOMPLETE_BRANCHES_ERROR,
    error,
  };
}
// END AUTOCOMPLETE_BRANCHES LOAD
