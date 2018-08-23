import {
  LOAD_RUSH_HOURS,
  LOAD_RUSH_HOURS_SUCCESS,
  LOAD_RUSH_HOURS_ERROR,
  RUSH_HOURS_FARE_AND_WORKING_HOURS_ERRORS,
} from './constants';

export function loadRushHours(params) {
  return {
    type: LOAD_RUSH_HOURS,
    params,
  };
}

export function rushHoursLoaded(rushHours) {
  return {
    type: LOAD_RUSH_HOURS_SUCCESS,
    rushHours,
  };
}

export function loadRushHoursError(error) {
  return {
    type: LOAD_RUSH_HOURS_ERROR,
    error,
  };
}

export function rushHoursFareAndWorkingHoursErrorsLoaded(rushHoursFareAndWorkingHoursErrors) {
  return {
    type: RUSH_HOURS_FARE_AND_WORKING_HOURS_ERRORS,
    rushHoursFareAndWorkingHoursErrors,
  };
}
