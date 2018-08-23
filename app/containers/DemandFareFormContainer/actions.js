import {
  REMOVE_DEMAND_FARE,
  REMOVE_DEMAND_FARE_ERROR,
  REMOVE_DEMAND_FARE_SUCCESS,
  CREATE_DEMAND_FARE,
  CREATE_DEMAND_FARE_ERROR,
  CREATE_DEMAND_FARE_SUCCESS,
  EDIT_DEMAND_FARE,
  EDIT_DEMAND_FARE_ERROR,
  EDIT_DEMAND_FARE_SUCCESS,
} from './constants';

// CREATE DEMAND_FARE
export function createDemandFare(demandFare) {
  return {
    type: CREATE_DEMAND_FARE,
    demandFare,
  };
}

export function createDemandFareError(error) {
  return {
    type: CREATE_DEMAND_FARE_ERROR,
    error,
  };
}

export function demandFareCreated(demandFare) {
  return {
    type: CREATE_DEMAND_FARE_SUCCESS,
    demandFare,
  };
}
// END CREATE DEMAND_FARE

// EDIT DEMAND_FARE
export function editDemandFare(demandFare) {
  return {
    type: EDIT_DEMAND_FARE,
    demandFare,
  };
}

export function editDemandFareError(error) {
  return {
    type: EDIT_DEMAND_FARE_ERROR,
    error,
  };
}

export function demandFareEdited(demandFare) {
  return {
    type: EDIT_DEMAND_FARE_SUCCESS,
    demandFare,
  };
}
// END EDIT DEMAND_FARE

// REMOVE DEMAND_FARE
export function removeDemandFareForm(id, resolve, reject) {
  return {
    type: REMOVE_DEMAND_FARE,
    id,
    resolve,
    reject,
  };
}

export function removeDemandFareError(error) {
  return {
    type: REMOVE_DEMAND_FARE_ERROR,
    error,
  };
}

export function demandFareRemoved(id) {
  return {
    type: REMOVE_DEMAND_FARE_SUCCESS,
    id,
  };
}

// END REMOVE DEMAND_FARE
