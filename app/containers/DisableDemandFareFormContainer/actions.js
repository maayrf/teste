import {
  EDIT_DISABLE_DEMAND_FARE,
  EDIT_DISABLE_DEMAND_FARE_ERROR,
  EDIT_DISABLE_DEMAND_FARE_SUCCESS,
} from './constants';

// EDIT DISABLE_DEMAND_FARE_FORM
export function editDisableDemandFare(disableDemandFare) {
  return {
    type: EDIT_DISABLE_DEMAND_FARE,
    disableDemandFare,
  };
}

export function editDisableDemandFareError(error) {
  return {
    type: EDIT_DISABLE_DEMAND_FARE_ERROR,
    error,
  };
}

export function disableDemandFareEdited(disableDemandFare) {
  return {
    type: EDIT_DISABLE_DEMAND_FARE_SUCCESS,
    disableDemandFare,
  };
}
// END EDIT DISABLE_DEMAND_FARE_FORM
