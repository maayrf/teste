import {
  LOAD_METERS,
  LOAD_METERS_ERROR,
  LOAD_METERS_SUCCESS,
} from './constants';

// METER LOAD

export function loadMeters(params) {
  return {
    type: LOAD_METERS,
    params,
  };
}

export function metersLoaded(meters, totalCount, limit, offset) {
  return {
    type: LOAD_METERS_SUCCESS,
    meters,
    totalCount,
    limit,
    offset,
  };
}

export function loadMetersError(error) {
  return {
    type: LOAD_METERS_ERROR,
    error,
  };
}
// END METER LOAD
