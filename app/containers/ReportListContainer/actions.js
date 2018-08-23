import {
  LOAD_REPORTS,
  LOAD_REPORTS_ERROR,
  LOAD_REPORTS_SUCCESS,
} from './constants';

// REPORT LOAD

export function loadReports(params) {
  return {
    type: LOAD_REPORTS,
    params,
  };
}

export function reportsLoaded(reports, totalCount, limit, offset) {
  return {
    type: LOAD_REPORTS_SUCCESS,
    reports,
    totalCount,
    limit,
    offset,
  };
}

export function loadReportsError(error) {
  return {
    type: LOAD_REPORTS_ERROR,
    error,
  };
}
// END REPORT LOAD
