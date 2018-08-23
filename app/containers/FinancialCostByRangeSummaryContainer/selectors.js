import { createSelector } from 'reselect';

export const selectFinancialCostByRangeSummary = (state) =>
  state.get('financialCostByRangeSummary');

export const makeSelectFinancialCostByRangeSummaryLoading = () =>
  createSelector(
    selectFinancialCostByRangeSummary,
    (financialCostByRangeSummaryState) =>
      financialCostByRangeSummaryState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectFinancialCostByRangeSummary,
    (financialCostByRangeSummaryState) =>
      financialCostByRangeSummaryState.get('error')
  );

export const makeSelectFinancialCostByRangeSummary = () =>
  createSelector(
    selectFinancialCostByRangeSummary,
    (financialCostByRangeSummaryState) =>
      financialCostByRangeSummaryState.get('financialCostByRangeSummary').toJS()
  );
