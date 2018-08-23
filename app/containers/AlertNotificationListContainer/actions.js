import {
  LOAD_ALERT_NOTIFICATIONS,
  LOAD_ALERT_NOTIFICATIONS_ERROR,
  LOAD_ALERT_NOTIFICATIONS_SUCCESS,
  STOP_LOAD_ALERT_NOTIFICATIONS_SUCCESS,
} from './constants';

// ALERT_NOTIFICATION LOAD

export function loadAlertNotifications(params) {
  return {
    type: LOAD_ALERT_NOTIFICATIONS,
    params,
  };
}

export function alertNotificationsLoaded(alertNotifications) {
  return {
    type: LOAD_ALERT_NOTIFICATIONS_SUCCESS,
    alertNotifications,
  };
}

export function loadAlertNotificationsError(error) {
  return {
    type: LOAD_ALERT_NOTIFICATIONS_ERROR,
    error,
  };
}

export function alertNotificationDisconnected() {
  return {
    type: STOP_LOAD_ALERT_NOTIFICATIONS_SUCCESS,
  };
}
// END ALERT_NOTIFICATION LOAD
