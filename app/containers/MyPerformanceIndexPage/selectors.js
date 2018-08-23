import { createSelector } from 'reselect';
import { denormalizeMyPerformanceIndexs } from './normalizr';

export const selectMyPerformanceIndexs = (state) =>
  state.get('myPerformanceIndex');

export const makeSelectMyPerformanceIndexsLoading = () =>
  createSelector(selectMyPerformanceIndexs, (myPerformanceIndexState) =>
    myPerformanceIndexState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectMyPerformanceIndexs, (myPerformanceIndexState) =>
    myPerformanceIndexState.get('error'));

export const makeSelectMyPerformanceIndexes = () =>
  createSelector(selectMyPerformanceIndexs, (myPerformanceIndexState) =>
    denormalizeMyPerformanceIndexs(myPerformanceIndexState.get('myPerformanceIndex').toJS()));
