import {
  REMOVE_DEMAND_EXCEED_FARE,
  REMOVE_DEMAND_EXCEED_FARE_ERROR,
  REMOVE_DEMAND_EXCEED_FARE_SUCCESS,
  CREATE_DEMAND_EXCEED_FARE,
  CREATE_DEMAND_EXCEED_FARE_ERROR,
  CREATE_DEMAND_EXCEED_FARE_SUCCESS,
  EDIT_DEMAND_EXCEED_FARE,
  EDIT_DEMAND_EXCEED_FARE_ERROR,
  EDIT_DEMAND_EXCEED_FARE_SUCCESS,
} from './constants';

// CREATE CONSUMPTION_FARE_FORM
export function createDemandExceedFare(demandExceedFare) {
  return {
    type: CREATE_DEMAND_EXCEED_FARE,
    demandExceedFare,
  };
}

export function createDemandExceedFareError(error) {
  return {
    type: CREATE_DEMAND_EXCEED_FARE_ERROR,
    error,
  };
}

export function demandExceedCreated(demandExceedFare) {
  return {
    type: CREATE_DEMAND_EXCEED_FARE_SUCCESS,
    demandExceedFare,
  };
}
// END CREATE CONSUMPTION_FARE_FORM

// EDIT CONSUMPTION_FARE_FORM
export function editDemandExceedFare(demandExceedFare) {
  return {
    type: EDIT_DEMAND_EXCEED_FARE,
    demandExceedFare,
  };
}

export function editDemandExceedFareError(error) {
  return {
    type: EDIT_DEMAND_EXCEED_FARE_ERROR,
    error,
  };
}

export function demandExceedFareEdited(demandExceedFare) {
  return {
    type: EDIT_DEMAND_EXCEED_FARE_SUCCESS,
    demandExceedFare,
  };
}
// END EDIT CONSUMPTION_FARE_FORM

// REMOVE CONSUMPTION_FARE_FORM
export function removeDemandExceedFareForm(id, resolve, reject) {
  return {
    type: REMOVE_DEMAND_EXCEED_FARE,
    id,
    resolve,
    reject,
  };
}

export function removeDemandExceedFareError(error) {
  return {
    type: REMOVE_DEMAND_EXCEED_FARE_ERROR,
    error,
  };
}

export function demandExceedFareRemoved(id) {
  return {
    type: REMOVE_DEMAND_EXCEED_FARE_SUCCESS,
    id,
  };
}

// END REMOVE CONSUMPTION_FARE_FORM
