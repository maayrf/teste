import { createSelector } from 'reselect';

export const selectConsumptionByRangeSummary = (state) =>
  state.get('consumptionByRangeSummary');

export const makeSelectConsumptionByRangeSummaryLoading = () =>
  createSelector(
    selectConsumptionByRangeSummary,
    (consumptionByRangeSummaryState) =>
      consumptionByRangeSummaryState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectConsumptionByRangeSummary,
    (consumptionByRangeSummaryState) =>
      consumptionByRangeSummaryState.get('error')
  );

export const makeSelectConsumptionByRangeSummary = () =>
  createSelector(
    selectConsumptionByRangeSummary,
    (consumptionByRangeSummaryState) =>
      consumptionByRangeSummaryState.get('consumptionByRangeSummary').toJS()
  );
