import {
  LOAD_CONSUMPTION_FARES_BY_BRANCH,
  LOAD_CONSUMPTION_FARES_BY_BRANCH_ERROR,
  LOAD_CONSUMPTION_FARES_BY_BRANCH_SUCCESS,
} from './constants';

// CONSUMPTION_FARE_TIME_LINE_BY_BRANCH LOAD

export function loadConsumptionFaresByBranchId(branchId, params) {
  return {
    type: LOAD_CONSUMPTION_FARES_BY_BRANCH,
    branchId,
    params,
  };
}

export function consumptionFaresByBranchIdLoaded(
  consumptionFares,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_CONSUMPTION_FARES_BY_BRANCH_SUCCESS,
    consumptionFares,
    totalCount,
    limit,
    offset,
  };
}

export function consumptionFaresByBranchIdError(error) {
  return {
    type: LOAD_CONSUMPTION_FARES_BY_BRANCH_ERROR,
    error,
  };
}
// END CONSUMPTION_FARE_TIME_LINE_BY_BRANCH LOAD
