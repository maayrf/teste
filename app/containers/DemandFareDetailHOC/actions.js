import {
  LOAD_DEMAND_FARE_BY_ID,
  LOAD_DEMAND_FARE_BY_ID_ERROR,
  LOAD_DEMAND_FARE_BY_ID_SUCCESS,
} from './constants';

// DemandFare
export function loadDemandFareById(id) {
  return {
    type: LOAD_DEMAND_FARE_BY_ID,
    id,
  };
}

export function loadDemandFareByIdError(error) {
  return {
    type: LOAD_DEMAND_FARE_BY_ID_ERROR,
    error,
  };
}

export function demandFareByIdLoaded(demandFare) {
  return {
    type: LOAD_DEMAND_FARE_BY_ID_SUCCESS,
    demandFare,
  };
}
// END DemandFare
