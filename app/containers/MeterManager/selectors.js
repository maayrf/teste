import { createSelector } from 'reselect';
import { denormalizePendingMeters } from './normalizr';

export const selectMeters = (state) => state.get('pendingMeters');

export const makeSelectError = () =>
  createSelector(selectMeters, (meterState) => meterState.get('error'));

export const makeSelectMoveMeterLoading = () =>
  createSelector(selectMeters, (meterState) =>
    meterState.get('moveMeterLoading'));

export const makeSelectPendingMeters = () =>
  createSelector(selectMeters, (meterState) => {
    const pendingMeters = meterState.get('pendingMeters');
    return denormalizePendingMeters(pendingMeters);
  });

export const selectLoadingPendingMetersAndMeters = (state) =>
  state.getIn(['pendingMeters', 'loading']) &&
  state.getIn(['metersTreeFilter', 'loading']);
