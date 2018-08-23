import {
  LOAD_KPI_REPORT_DATES,
  LOAD_KPI_REPORT_DATES_ERROR,
  LOAD_KPI_REPORT_DATES_SUCCESS,
} from './constants';

// KPI_REPORT_DATE LOAD

export function loadKpiReportDates(params) {
  return {
    type: LOAD_KPI_REPORT_DATES,
    params,
  };
}

export function kpiReportDatesLoaded(
  kpiReportDates,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_KPI_REPORT_DATES_SUCCESS,
    kpiReportDates,
    totalCount,
    limit,
    offset,
  };
}

export function loadKpiReportDatesError(error) {
  return {
    type: LOAD_KPI_REPORT_DATES_ERROR,
    error,
  };
}
// END KPI_REPORT_DATE LOAD
