import {
  LOAD_BRANCH_WORKING_HOURS,
  LOAD_TOTAL_WORKING_HOURS_OF_BRANCH_SUCCESS,
  LOAD_PAGINATED_INFO_OF_BRANCH_WORKING_HOURS_ERROR,
  LOAD_PAGINATED_INFO_OF_BRANCH_WORKING_HOURS_SUCCESS,
} from './constants';

// WORKING_HOURS_CONTAINER LOAD

export function loadPaginatedInfoOfBranchOrMeterWorkingHours(branchId, params) {
  return {
    type: LOAD_BRANCH_WORKING_HOURS,
    branchId,
    params,
  };
}

export function branchWorkingHoursLoaded(
  workingHours,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_PAGINATED_INFO_OF_BRANCH_WORKING_HOURS_SUCCESS,
    workingHours,
    totalCount,
    limit,
    offset,
  };
}

export function loadBranchWorkingHoursError(error) {
  return {
    type: LOAD_PAGINATED_INFO_OF_BRANCH_WORKING_HOURS_ERROR,
    error,
  };
}

// END WORKING_HOURS_CONTAINER LOAD
