import { createSelector } from 'reselect';
import { denormalizeAlertsEmitted } from './normalizr';

export const selectAlertsEmitted = (state) => state.get('alertsEmitted');

export const makeSelectAlertsEmittedLoading = () =>
  createSelector(selectAlertsEmitted, (alertsEmittedState) =>
    alertsEmittedState.get('loading'));

export const makeSelectLimit = () =>
  createSelector(selectAlertsEmitted, (alertsEmittedState) =>
    alertsEmittedState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectAlertsEmitted, (alertsEmittedState) =>
    alertsEmittedState.get('totalCount'));

export const makeSelectError = () =>
  createSelector(selectAlertsEmitted, (alertsEmittedState) =>
    alertsEmittedState.get('error'));

export const makeSelectAlertsEmitted = () =>
  createSelector(selectAlertsEmitted, (alertsEmittedState) =>
    denormalizeAlertsEmitted(alertsEmittedState.get('alertsEmitted').toJS()));
