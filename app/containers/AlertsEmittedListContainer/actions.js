import {
  LOAD_ALERTS_EMITTED,
  LOAD_ALERTS_EMITTED_ERROR,
  LOAD_ALERTS_EMITTED_SUCCESS,
  CHANGE_ALERTS_EMITTED_STATUS,
  CHANGE_ALERTS_EMITTED_STATUS_SUCCESS,
  CHANGE_ALERTS_EMITTED_STATUS_ERROR,
} from './constants';

// ALERTS_EMITTED STATUS

export function changeAlertsEmittedStatus(alerts, onSuccess) {
  return {
    type: CHANGE_ALERTS_EMITTED_STATUS,
    alerts,
    onSuccess,
  };
}

export function changeAlertsEmittedStatusError(error) {
  return {
    type: CHANGE_ALERTS_EMITTED_STATUS_ERROR,
    error,
  };
}

export function alertsEmittedStatusChanged() {
  return {
    type: CHANGE_ALERTS_EMITTED_STATUS_SUCCESS,
  };
}

// ALERTS_EMITTED LOAD

export function loadAlertsEmitted(params) {
  return {
    type: LOAD_ALERTS_EMITTED,
    params,
  };
}

export function alertsEmittedLoaded(alertsEmitted, totalCount, limit, offset) {
  return {
    type: LOAD_ALERTS_EMITTED_SUCCESS,
    alertsEmitted,
    totalCount,
    limit,
    offset,
  };
}

export function loadAlertsEmittedError(error) {
  return {
    type: LOAD_ALERTS_EMITTED_ERROR,
    error,
  };
}
// END ALERTS_EMITTED LOAD
