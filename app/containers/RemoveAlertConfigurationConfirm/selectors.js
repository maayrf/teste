import { createSelector } from 'reselect';

export const selectRemoveAlertConfiguration = (state) =>
  state.get('removeAlertConfiguration');

export const makeSelectLoading = () =>
  createSelector(
    selectRemoveAlertConfiguration,
    (removeAlertConfigurationState) =>
      removeAlertConfigurationState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectRemoveAlertConfiguration,
    (removeAlertConfigurationState) =>
      removeAlertConfigurationState.get('error')
  );

export const makeSelectSuccess = () =>
  createSelector(
    selectRemoveAlertConfiguration,
    (removeAlertConfigurationState) =>
      removeAlertConfigurationState.get('success')
  );
