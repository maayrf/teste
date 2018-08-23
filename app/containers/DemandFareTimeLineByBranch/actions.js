import {
  LOAD_DEMAND_FARES_BY_BRANCH,
  LOAD_DEMAND_FARES_BY_BRANCH_ERROR,
  LOAD_DEMAND_FARES_BY_BRANCH_SUCCESS,
} from './constants';

// CONSUMPTION_FARE_TIME_LINE_BY_BRANCH LOAD

export function loadDemandFaresByBranchId(branchId, params) {
  return {
    type: LOAD_DEMAND_FARES_BY_BRANCH,
    branchId,
    params,
  };
}

export function demandFaresByBranchIdLoaded(
  demandFares,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_DEMAND_FARES_BY_BRANCH_SUCCESS,
    demandFares,
    totalCount,
    limit,
    offset,
  };
}

export function demandFaresByBranchIdError(error) {
  return {
    type: LOAD_DEMAND_FARES_BY_BRANCH_ERROR,
    error,
  };
}
// END CONSUMPTION_FARE_TIME_LINE_BY_BRANCH LOAD
