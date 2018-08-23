import {
  REMOVE_ALERT_CONFIGURATION,
  REMOVE_ALERT_CONFIGURATION_ERROR,
  REMOVE_ALERT_CONFIGURATION_SUCCESS,
  CREATE_ALERT_CONFIGURATION,
  CREATE_ALERT_CONFIGURATION_ERROR,
  CREATE_ALERT_CONFIGURATION_SUCCESS,
  EDIT_ALERT_CONFIGURATION,
  EDIT_ALERT_CONFIGURATION_ERROR,
  EDIT_ALERT_CONFIGURATION_SUCCESS,
} from './constants';

// CREATE ALERT_CONFIGURATION_FORM
export function createAlertConfiguration(alertConfiguration) {
  return {
    type: CREATE_ALERT_CONFIGURATION,
    alertConfiguration,
  };
}

export function createAlertConfigurationFormError(error) {
  return {
    type: CREATE_ALERT_CONFIGURATION_ERROR,
    error,
  };
}

export function alertConfigurationCreated(alertConfiguration) {
  return {
    type: CREATE_ALERT_CONFIGURATION_SUCCESS,
    alertConfiguration,
  };
}
// END CREATE ALERT_CONFIGURATION_FORM

// EDIT ALERT_CONFIGURATION_FORM
export function editAlertConfiguration(alertConfiguration) {
  return {
    type: EDIT_ALERT_CONFIGURATION,
    alertConfiguration,
  };
}

export function editAlertConfigurationError(error) {
  return {
    type: EDIT_ALERT_CONFIGURATION_ERROR,
    error,
  };
}

export function alertConfigurationEdited(alertConfiguration) {
  return {
    type: EDIT_ALERT_CONFIGURATION_SUCCESS,
    alertConfiguration,
  };
}
// END EDIT ALERT_CONFIGURATION_FORM

// REMOVE ALERT_CONFIGURATION_FORM
export function removeAlertConfigurationForm(id) {
  return {
    type: REMOVE_ALERT_CONFIGURATION,
    id,
  };
}

export function removeAlertConfigurationError(error) {
  return {
    type: REMOVE_ALERT_CONFIGURATION_ERROR,
    error,
  };
}

export function alertConfigurationRemoved(id) {
  return {
    type: REMOVE_ALERT_CONFIGURATION_SUCCESS,
    id,
  };
}

// END REMOVE ALERT_CONFIGURATION_FORM
