import {
  LOAD_ALERT_CONFIGURATIONS,
  LOAD_ALERT_CONFIGURATIONS_ERROR,
  LOAD_ALERT_CONFIGURATIONS_SUCCESS,
} from './constants';

// ALERT_CONFIGURATION LOAD

export function loadAlertConfigurations(params) {
  return {
    type: LOAD_ALERT_CONFIGURATIONS,
    params,
  };
}

export function alertConfigurationsLoaded(
  alertConfigurations,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_ALERT_CONFIGURATIONS_SUCCESS,
    alertConfigurations,
    totalCount,
    limit,
    offset,
  };
}

export function loadAlertConfigurationsError(error) {
  return {
    type: LOAD_ALERT_CONFIGURATIONS_ERROR,
    error,
  };
}
// END ALERT_CONFIGURATION LOAD
