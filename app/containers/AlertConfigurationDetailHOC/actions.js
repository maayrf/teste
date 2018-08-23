import {
  LOAD_ALERT_CONFIGURATION_BY_ID,
  LOAD_ALERT_CONFIGURATION_BY_ID_ERROR,
  LOAD_ALERT_CONFIGURATION_BY_ID_SUCCESS,
} from './constants';

// AlertConfiguration
export function loadAlertConfigurationById(id) {
  return {
    type: LOAD_ALERT_CONFIGURATION_BY_ID,
    id,
  };
}

export function loadAlertConfigurationByIdError(error) {
  return {
    type: LOAD_ALERT_CONFIGURATION_BY_ID_ERROR,
    error,
  };
}

export function alertConfigurationByIdLoaded(alertConfiguration) {
  return {
    type: LOAD_ALERT_CONFIGURATION_BY_ID_SUCCESS,
    alertConfiguration,
  };
}
// END AlertConfiguration
