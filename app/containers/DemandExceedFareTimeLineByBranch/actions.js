import {
  LOAD_DEMAND_EXCEED_FARES_BY_BRANCH,
  LOAD_DEMAND_EXCEED_FARES_BY_BRANCH_ERROR,
  LOAD_DEMAND_EXCEED_FARES_BY_BRANCH_SUCCESS,
} from './constants';

// CONSUMPTION_FARE_TIME_LINE_BY_BRANCH LOAD

export function loadDemandExceedFaresByBranchId(branchId, params) {
  return {
    type: LOAD_DEMAND_EXCEED_FARES_BY_BRANCH,
    branchId,
    params,
  };
}

export function demandExceedFaresByBranchIdLoaded(
  demandExceedFares,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_DEMAND_EXCEED_FARES_BY_BRANCH_SUCCESS,
    demandExceedFares,
    totalCount,
    limit,
    offset,
  };
}

export function demandExceedFaresByBranchIdError(error) {
  return {
    type: LOAD_DEMAND_EXCEED_FARES_BY_BRANCH_ERROR,
    error,
  };
}
// END CONSUMPTION_FARE_TIME_LINE_BY_BRANCH LOAD
