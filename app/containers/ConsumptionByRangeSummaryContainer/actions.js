import {
  LOAD_CONSUMPTION_BY_RANGE_SUMMARY,
  LOAD_CONSUMPTION_BY_RANGE_SUMMARY_ERROR,
  LOAD_CONSUMPTION_BY_RANGE_SUMMARY_SUCCESS,
} from './constants';

// CONSUMPTION_BY_RANGE_SUMMARY LOAD

export function loadConsumptionByRangeSummary(params) {
  return {
    type: LOAD_CONSUMPTION_BY_RANGE_SUMMARY,
    params,
  };
}

export function consumptionByRangeSummaryLoaded(
  consumptionByRangeSummary,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_CONSUMPTION_BY_RANGE_SUMMARY_SUCCESS,
    consumptionByRangeSummary,
    totalCount,
    limit,
    offset,
  };
}

export function loadConsumptionByRangeSummaryError(error) {
  return {
    type: LOAD_CONSUMPTION_BY_RANGE_SUMMARY_ERROR,
    error,
  };
}
// END CONSUMPTION_BY_RANGE_SUMMARY LOAD
