import moment from 'moment';
import {
  LOAD_CURRENT_FARES_BY_BRANCH,
  LOAD_CURRENT_FARES_BY_BRANCH_ERROR,
  LOAD_CURRENT_FARES_BY_BRANCH_SUCCESS,
} from './constants';

// FARE LOAD

export function loadCurrentFaresByBranch(branchId) {
  const currentDate = moment().format('YYYY-MM-DD');
  return {
    type: LOAD_CURRENT_FARES_BY_BRANCH,
    branchId,
    currentDate,
  };
}

export function currentFaresByBranchLoaded({
  consumptionFare,
  demandFare,
  demandExceedFare,
}) {
  return {
    type: LOAD_CURRENT_FARES_BY_BRANCH_SUCCESS,
    consumptionFare,
    demandFare,
    demandExceedFare,
  };
}

export function loadCurrentFaresByBranchError(error) {
  return {
    type: LOAD_CURRENT_FARES_BY_BRANCH_ERROR,
    error,
  };
}
// END FARE LOAD
