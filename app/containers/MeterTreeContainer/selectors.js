import { createSelector } from 'reselect';
import { denormalizeMeterTrees } from './normalizr';

export const selectMeterTrees = (state) => state.get('meterTree');

export const makeSelectMeterTreesLoading = () =>
  createSelector(selectMeterTrees, (meterTreeState) =>
    meterTreeState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectMeterTrees, (meterTreeState) =>
    meterTreeState.get('error'));

export const makeSelectMeterTree = () =>
  createSelector(selectMeterTrees, (meterTreeState) =>
    denormalizeMeterTrees(meterTreeState.get('meterTree').toJS()));
