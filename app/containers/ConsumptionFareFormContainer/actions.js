import {
  REMOVE_CONSUMPTION_FARE,
  REMOVE_CONSUMPTION_FARE_ERROR,
  REMOVE_CONSUMPTION_FARE_SUCCESS,
  CREATE_CONSUMPTION_FARE,
  CREATE_CONSUMPTION_FARE_ERROR,
  CREATE_CONSUMPTION_FARE_SUCCESS,
  EDIT_CONSUMPTION_FARE,
  EDIT_CONSUMPTION_FARE_ERROR,
  EDIT_CONSUMPTION_FARE_SUCCESS,
} from './constants';

// CREATE CONSUMPTION_FARE_FORM
export function createConsumptionFare(consumptionFare) {
  return {
    type: CREATE_CONSUMPTION_FARE,
    consumptionFare,
  };
}

export function createConsumptionFareError(error) {
  return {
    type: CREATE_CONSUMPTION_FARE_ERROR,
    error,
  };
}

export function consumptionFareCreated(consumptionFare) {
  return {
    type: CREATE_CONSUMPTION_FARE_SUCCESS,
    consumptionFare,
  };
}
// END CREATE CONSUMPTION_FARE_FORM

// EDIT CONSUMPTION_FARE_FORM
export function editConsumptionFare(consumptionFare) {
  return {
    type: EDIT_CONSUMPTION_FARE,
    consumptionFare,
  };
}

export function editConsumptionFareError(error) {
  return {
    type: EDIT_CONSUMPTION_FARE_ERROR,
    error,
  };
}

export function consumptionFareEdited(consumptionFare) {
  return {
    type: EDIT_CONSUMPTION_FARE_SUCCESS,
    consumptionFare,
  };
}
// END EDIT CONSUMPTION_FARE_FORM

// REMOVE CONSUMPTION_FARE_FORM
export function removeConsumptionFareForm(id, resolve, reject) {
  return {
    type: REMOVE_CONSUMPTION_FARE,
    id,
    resolve,
    reject,
  };
}

export function removeConsumptionFareError(error) {
  return {
    type: REMOVE_CONSUMPTION_FARE_ERROR,
    error,
  };
}

export function consumptionFareRemoved(id) {
  return {
    type: REMOVE_CONSUMPTION_FARE_SUCCESS,
    id,
  };
}

// END REMOVE CONSUMPTION_FARE_FORM
