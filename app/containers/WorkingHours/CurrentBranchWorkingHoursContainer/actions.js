import {
  LOAD_CURRENT_WORKING_HOURS_OF_BRANCH,
  LOAD_CURRENT_WORKING_HOURS_OF_BRANCH_ERROR,
  LOAD_CURRENT_WORKING_HOURS_OF_BRANCH_SUCCESS,
} from './constants';

export function loadCurrentBranchWorkingHours(branchId) {
  return {
    type: LOAD_CURRENT_WORKING_HOURS_OF_BRANCH,
    branchId,
  };
}

export function currentBranchWorkingHoursLoaded(currentBranchWorkingHours) {
  return {
    type: LOAD_CURRENT_WORKING_HOURS_OF_BRANCH_SUCCESS,
    currentBranchWorkingHours,
  };
}

export function loadCurrentBranchWorkingHoursError(error) {
  return {
    type: LOAD_CURRENT_WORKING_HOURS_OF_BRANCH_ERROR,
    error,
  };
}
