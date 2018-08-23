import {
  LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY,
  LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY_ERROR,
  LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY_SUCCESS,
} from './constants';

// CONSUMPTION_BY_RANGE_SUMMARY LOAD

export function loadFinancialCostByRangeSummary(params) {
  return {
    type: LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY,
    params,
  };
}

export function financialCostByRangeSummaryLoaded(
  financialCostByRangeSummary,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY_SUCCESS,
    financialCostByRangeSummary,
    totalCount,
    limit,
    offset,
  };
}

export function loadFinancialCostByRangeSummaryError(error) {
  return {
    type: LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY_ERROR,
    error,
  };
}
// END CONSUMPTION_BY_RANGE_SUMMARY LOAD
