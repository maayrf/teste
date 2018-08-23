import { createSelector } from 'reselect';
import { denormalizePerformanceConfigurations } from './normalizr';

export const selectPerformanceConfigurations = (reducerKey = 'performanceConfigurations') => (state) => state.get(reducerKey);

export const makeSelectPerformanceConfigurationsLoading = (reducerKey) =>
  createSelector(
    selectPerformanceConfigurations(reducerKey),
    (performanceConfigurationState) =>
      performanceConfigurationState.get('loading')
  );

export const makeSelectError = (reducerKey) =>
  createSelector(
    selectPerformanceConfigurations(reducerKey),
    (performanceConfigurationState) =>
      performanceConfigurationState.get('error')
  );

export const makeSelectPerformanceConfigurations = (reducerKey) =>
  createSelector(
    selectPerformanceConfigurations(reducerKey),
    (performanceConfigurationState) =>
      denormalizePerformanceConfigurations(performanceConfigurationState.get('performanceConfigurations').toJS())
  );

export const makeSelectLimit = (reducerKey) =>
  createSelector(
    selectPerformanceConfigurations(reducerKey),
    (performanceConfigurationState) =>
      performanceConfigurationState.get('limit')
  );

export const makeSelectTotalCount = (reducerKey) =>
  createSelector(
    selectPerformanceConfigurations(reducerKey),
    (performanceConfigurationState) =>
      performanceConfigurationState.get('totalCount')
  );
