import { createSelector } from 'reselect';

export const selectAlertConfiguration = (state) =>
  state.get('alertConfiguration');

export const makeSelectLoading = () =>
  createSelector(selectAlertConfiguration, (alertConfigurationState) =>
    alertConfigurationState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectAlertConfiguration, (alertConfigurationState) =>
    alertConfigurationState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectAlertConfiguration, (alertConfigurationState) =>
    alertConfigurationState.get('success'));
