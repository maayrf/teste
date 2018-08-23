import { createSelector } from 'reselect';
import { denormalizeMeters } from './normalizr';

export const selectMeters = (state) => state.get('meters');

export const makeSelectMetersLoading = () =>
  createSelector(selectMeters, (meterState) => meterState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectMeters, (meterState) => meterState.get('error'));

export const makeSelectMeters = () =>
  createSelector(selectMeters, (meterState) =>
    denormalizeMeters(meterState.get('meters').toJS()));

export const makeSelectLimit = () =>
  createSelector(selectMeters, (meterState) => meterState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectMeters, (meterState) => meterState.get('totalCount'));
