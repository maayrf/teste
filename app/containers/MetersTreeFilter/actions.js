import {
  LOAD_METERS,
  LOAD_METERS_SUCCESS,
  LOAD_METERS_ERROR,
  TOGGLE_CHECK_METER,
  SET_SCALE_VISUALIZATION,
  SET_INIT_AND_END_DATE,
  SELECT_METER,
  CLEAR_CHECKED_METERS,
} from './constants';

export function clearCheckedMeters() {
  return {
    type: CLEAR_CHECKED_METERS,
  };
}

// METERS LOAD

export function selectMeter(selectedMeter) {
  return {
    type: SELECT_METER,
    selectedMeter,
  };
}

export function loadMeters(params) {
  return {
    type: LOAD_METERS,
    params,
  };
}

export function metersLoaded(meters) {
  return {
    type: LOAD_METERS_SUCCESS,
    meters,
  };
}

export function loadMetersError(error) {
  return {
    type: LOAD_METERS_ERROR,
    error,
  };
}
// END METERS LOAD

export function toggleCheckMeter(meterId) {
  return {
    type: TOGGLE_CHECK_METER,
    meterId,
  };
}

export function setScaleVisualization(scaleVisualization) {
  return {
    type: SET_SCALE_VISUALIZATION,
    scaleVisualization,
  };
}

export function setInitAndEndDate(initDate, endDate) {
  return {
    type: SET_INIT_AND_END_DATE,
    startDate: initDate,
    endDate,
  };
}
