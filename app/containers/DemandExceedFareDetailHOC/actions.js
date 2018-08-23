import {
  LOAD_DEMAND_EXCEED_FARE_BY_ID,
  LOAD_DEMAND_EXCEED_FARE_BY_ID_ERROR,
  LOAD_DEMAND_EXCEED_FARE_BY_ID_SUCCESS,
} from './constants';

// DemandExceedFare
export function loadDemandExceedFareById(id) {
  return {
    type: LOAD_DEMAND_EXCEED_FARE_BY_ID,
    id,
  };
}

export function loadDemandExceedFareByIdError(error) {
  return {
    type: LOAD_DEMAND_EXCEED_FARE_BY_ID_ERROR,
    error,
  };
}

export function demandExceedFareByIdLoaded(demandExceedFare) {
  return {
    type: LOAD_DEMAND_EXCEED_FARE_BY_ID_SUCCESS,
    demandExceedFare,
  };
}
// END DemandExceedFare
