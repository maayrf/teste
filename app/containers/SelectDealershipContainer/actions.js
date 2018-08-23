import {
  LOAD_SELECT_DEALERSHIPS,
  LOAD_SELECT_DEALERSHIPS_ERROR,
  LOAD_SELECT_DEALERSHIPS_SUCCESS,
} from './constants';

// SELECT_DEALERSHIP LOAD

export function loadSelectDealerships() {
  return {
    type: LOAD_SELECT_DEALERSHIPS,
  };
}

export function selectDealershipsLoaded(selectDealerships) {
  return {
    type: LOAD_SELECT_DEALERSHIPS_SUCCESS,
    selectDealerships,
  };
}

export function loadSelectDealershipsError(error) {
  return {
    type: LOAD_SELECT_DEALERSHIPS_ERROR,
    error,
  };
}
// END SELECT_DEALERSHIP LOAD
