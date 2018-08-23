import {
  EDIT_DISABLE_DEMAND_EXCEED_FARE,
  EDIT_DISABLE_DEMAND_EXCEED_FARE_ERROR,
  EDIT_DISABLE_DEMAND_EXCEED_FARE_SUCCESS,
} from './constants';

// EDIT DISABLE_DEMAND_EXCEED_FARE_FORM
export function editDisableDemandExceedFare(disableDemandExceedFare) {
  return {
    type: EDIT_DISABLE_DEMAND_EXCEED_FARE,
    disableDemandExceedFare,
  };
}

export function editDisableDemandExceedFareError(error) {
  return {
    type: EDIT_DISABLE_DEMAND_EXCEED_FARE_ERROR,
    error,
  };
}

export function disableDemandExceedFareEdited(disableDemandExceedFare) {
  return {
    type: EDIT_DISABLE_DEMAND_EXCEED_FARE_SUCCESS,
    disableDemandExceedFare,
  };
}
// END EDIT DISABLE_DEMAND_EXCEED_FARE_FORM
