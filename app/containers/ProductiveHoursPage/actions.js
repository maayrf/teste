import {
  LOAD_PRODUCTIVE_HOURS,
  LOAD_PRODUCTIVE_HOURS_SUCCESS,
  LOAD_PRODUCTIVE_HOURS_ERROR,
  PRODUCTIVE_HOURS_FARE_AND_WORKING_HOURS_ERRORS,
} from './constants';

export function loadProductiveHours(params) {
  return {
    type: LOAD_PRODUCTIVE_HOURS,
    params,
  };
}

export function productiveHoursLoaded(productiveHours) {
  return {
    type: LOAD_PRODUCTIVE_HOURS_SUCCESS,
    productiveHours,
  };
}

export function loadProductiveHoursError(error) {
  return {
    type: LOAD_PRODUCTIVE_HOURS_ERROR,
    error,
  };
}

export function productiveHoursFareAndWorkingHoursErrorsLoaded(productiveHoursFareAndWorkingHoursErrors) {
  return {
    type: PRODUCTIVE_HOURS_FARE_AND_WORKING_HOURS_ERRORS,
    productiveHoursFareAndWorkingHoursErrors,
  };
}
