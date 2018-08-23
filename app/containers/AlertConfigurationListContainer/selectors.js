import { createSelector } from 'reselect';
import { denormalizeAlertConfigurations } from './normalizr';

export const selectAlertConfigurations = (state) =>
  state.get('alertConfigurations');

export const makeSelectAlertConfigurationsLoading = () =>
  createSelector(selectAlertConfigurations, (alertConfigurationState) =>
    alertConfigurationState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectAlertConfigurations, (alertConfigurationState) =>
    alertConfigurationState.get('error'));

export const makeSelectAlertConfigurations = () =>
  createSelector(selectAlertConfigurations, (alertConfigurationState) =>
    denormalizeAlertConfigurations(alertConfigurationState.get('alertConfigurations').toJS()));

export const makeSelectLimit = () =>
  createSelector(selectAlertConfigurations, (alertConfigurationState) =>
    alertConfigurationState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectAlertConfigurations, (alertConfigurationState) =>
    alertConfigurationState.get('totalCount'));
