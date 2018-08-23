// REMOVE DEMAND_FARE
import {
  REMOVE_ALERT_CONFIGURATION,
  REMOVE_ALERT_CONFIGURATION_ERROR,
  REMOVE_ALERT_CONFIGURATION_SUCCESS,
} from './constants';

export function removeAlertConfiguration(id) {
  return {
    type: REMOVE_ALERT_CONFIGURATION,
    id,
  };
}

export function removeAlertConfigurationError(id, error) {
  return {
    type: REMOVE_ALERT_CONFIGURATION_ERROR,
    id,
    error,
  };
}

export function alertConfigurationRemoved(id) {
  return {
    type: REMOVE_ALERT_CONFIGURATION_SUCCESS,
    id,
  };
}

// END REMOVE DEMAND_FARE
