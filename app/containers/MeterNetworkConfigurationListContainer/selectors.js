import { createSelector } from 'reselect';
import { denormalizeMeterNetworkConfigurations } from './normalizr';

export const selectMeterNetworkConfigurations = (state) =>
  state.get('meterNetworkConfigurations');

export const makeSelectMeterNetworkConfigurationsLoading = () =>
  createSelector(
    selectMeterNetworkConfigurations,
    (meterNetworkConfigurationState) =>
      meterNetworkConfigurationState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectMeterNetworkConfigurations,
    (meterNetworkConfigurationState) =>
      meterNetworkConfigurationState.get('error')
  );

export const makeSelectMeterNetworkConfigurations = () =>
  createSelector(
    selectMeterNetworkConfigurations,
    (meterNetworkConfigurationState) =>
      denormalizeMeterNetworkConfigurations(meterNetworkConfigurationState.get('meterNetworkConfigurations').toJS())
  );

export const makeSelectLimit = () =>
  createSelector(
    selectMeterNetworkConfigurations,
    (meterNetworkConfigurationState) =>
      meterNetworkConfigurationState.get('limit')
  );

export const makeSelectTotalCount = () =>
  createSelector(
    selectMeterNetworkConfigurations,
    (meterNetworkConfigurationState) =>
      meterNetworkConfigurationState.get('totalCount')
  );
