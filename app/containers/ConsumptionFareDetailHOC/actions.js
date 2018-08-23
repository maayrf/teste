import {
  LOAD_CONSUMPTION_FARE_BY_ID,
  LOAD_CONSUMPTION_FARE_BY_ID_ERROR,
  LOAD_CONSUMPTION_FARE_BY_ID_SUCCESS,
} from './constants';

// ConsumptionFare
export function loadConsumptionFareById(id) {
  return {
    type: LOAD_CONSUMPTION_FARE_BY_ID,
    id,
  };
}

export function loadConsumptionFareByIdError(error) {
  return {
    type: LOAD_CONSUMPTION_FARE_BY_ID_ERROR,
    error,
  };
}

export function consumptionFareByIdLoaded(consumptionFare) {
  return {
    type: LOAD_CONSUMPTION_FARE_BY_ID_SUCCESS,
    consumptionFare,
  };
}
// END ConsumptionFare
