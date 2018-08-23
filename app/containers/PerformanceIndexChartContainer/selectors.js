import { createSelector } from 'reselect';
import { denormalizePerformanceIndexCharts } from './normalizr';

export const selectPerformanceIndexCharts = (state) =>
  state.get('performanceIndexCharts');

export const makeSelectPerformanceIndexChartsLoading = () =>
  createSelector(selectPerformanceIndexCharts, (performanceIndexChartState) =>
    performanceIndexChartState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectPerformanceIndexCharts, (performanceIndexChartState) =>
    performanceIndexChartState.get('error'));

export const makeSelectPerformanceIndexCharts = () =>
  createSelector(selectPerformanceIndexCharts, (performanceIndexChartState) =>
    denormalizePerformanceIndexCharts(performanceIndexChartState.get('performanceIndexCharts').toJS()));
