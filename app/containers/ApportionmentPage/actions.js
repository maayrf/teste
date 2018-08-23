import {
  LOAD_APPORTIONMENTS,
  LOAD_APPORTIONMENTS_SUCCESS,
  LOAD_APPORTIONMENTS_ERROR,
  APPORTIONMENTS_FARE_AND_WORKING_HOURS_ERRORS,
} from './constants';

export function loadApportionments(params) {
  return {
    type: LOAD_APPORTIONMENTS,
    params,
  };
}

export function apportionmentsLoaded(apportionments) {
  return {
    type: LOAD_APPORTIONMENTS_SUCCESS,
    apportionments,
  };
}

export function loadApportionmentsError(error) {
  return {
    type: LOAD_APPORTIONMENTS_ERROR,
    error,
  };
}

export function apportionmentsFareAndWorkingHoursErrorsLoaded(apportionmentsFareAndWorkingHoursErrors) {
  return {
    type: APPORTIONMENTS_FARE_AND_WORKING_HOURS_ERRORS,
    apportionmentsFareAndWorkingHoursErrors,
  };
}
