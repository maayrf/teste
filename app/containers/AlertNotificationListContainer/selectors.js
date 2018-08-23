import { createSelector } from 'reselect';
import { denormalizeAlertNotifications } from './normalizr';

export const selectAlertNotifications = (state) =>
  state.get('alertNotifications');

export const makeSelectAlertNotificationsLoading = () =>
  createSelector(selectAlertNotifications, (alertNotificationState) =>
    alertNotificationState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectAlertNotifications, (alertNotificationState) =>
    alertNotificationState.get('error'));

export const makeSelectAlertNotifications = () =>
  createSelector(selectAlertNotifications, (alertNotificationState) =>
    denormalizeAlertNotifications(alertNotificationState.get('alertNotifications').toJS()));

export const makeSelectLimit = () =>
  createSelector(selectAlertNotifications, (alertNotificationState) =>
    alertNotificationState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectAlertNotifications, (alertNotificationState) =>
    alertNotificationState.get('totalCount'));
