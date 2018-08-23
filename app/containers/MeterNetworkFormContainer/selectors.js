import { createSelector } from 'reselect';

export const selectMeterNetworkForms = (state) => state.get('meterNetworkForm');

export const makeSelectMeterNetworkLoading = () =>
  createSelector(selectMeterNetworkForms, (meterNetworkFormState) =>
    meterNetworkFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectMeterNetworkForms, (meterNetworkFormState) =>
    meterNetworkFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectMeterNetworkForms, (meterNetworkFormState) =>
    meterNetworkFormState.get('success'));
