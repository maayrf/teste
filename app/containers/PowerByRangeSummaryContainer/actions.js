import {
  LOAD_POWER_BY_RANGE_SUMMARY,
  LOAD_POWER_BY_RANGE_SUMMARY_ERROR,
  LOAD_POWER_BY_RANGE_SUMMARY_SUCCESS,
} from './constants';

// CONSUMPTION_BY_RANGE_SUMMARY LOAD

export function loadPowerByRangeSummary(params) {
  return {
    type: LOAD_POWER_BY_RANGE_SUMMARY,
    params,
  };
}

export function powerByRangeSummaryLoaded(
  powerByRangeSummary,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_POWER_BY_RANGE_SUMMARY_SUCCESS,
    powerByRangeSummary,
    totalCount,
    limit,
    offset,
  };
}

export function loadPowerByRangeSummaryError(error) {
  return {
    type: LOAD_POWER_BY_RANGE_SUMMARY_ERROR,
    error,
  };
}
// END CONSUMPTION_BY_RANGE_SUMMARY LOAD
