import {
  LOAD_CONSUMPTIONS,
  LOAD_CONSUMPTIONS_ERROR,
  LOAD_CONSUMPTIONS_SUCCESS,
  CONSUMPTIONS_FARE_AND_WORKING_HOURS_ERRORS,
} from './constants';

export function loadConsumptions(params) {
  return {
    type: LOAD_CONSUMPTIONS,
    params,
  };
}

export function consumptionsLoaded(consumptions) {
  return {
    type: LOAD_CONSUMPTIONS_SUCCESS,
    consumptions,
  };
}

export function loadConsumptionsError(error) {
  return {
    type: LOAD_CONSUMPTIONS_ERROR,
    error,
  };
}

export function consumptionsFareAndWorkingHoursErrorsLoaded(consumptionsFareAndWorkingHoursErrors) {
  return {
    type: CONSUMPTIONS_FARE_AND_WORKING_HOURS_ERRORS,
    consumptionsFareAndWorkingHoursErrors,
  };
}
