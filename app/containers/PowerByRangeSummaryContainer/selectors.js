import { createSelector } from 'reselect';

export const selectPowerByRangeSummary = (state) =>
  state.get('powerByRangeSummary');

export const makeSelectPowerByRangeSummaryLoading = () =>
  createSelector(selectPowerByRangeSummary, (powerByRangeSummaryState) =>
    powerByRangeSummaryState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectPowerByRangeSummary, (powerByRangeSummaryState) =>
    powerByRangeSummaryState.get('error'));

export const makeSelectPowerByRangeSummary = () =>
  createSelector(selectPowerByRangeSummary, (powerByRangeSummaryState) =>
    powerByRangeSummaryState.get('powerByRangeSummary').toJS());
