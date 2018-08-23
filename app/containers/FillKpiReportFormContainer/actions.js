import {
  REMOVE_FILL_KPI_REPORT,
  REMOVE_FILL_KPI_REPORT_ERROR,
  REMOVE_FILL_KPI_REPORT_SUCCESS,
  CREATE_FILL_KPI_REPORT,
  CREATE_FILL_KPI_REPORT_ERROR,
  CREATE_FILL_KPI_REPORT_SUCCESS,
  EDIT_FILL_KPI_REPORT,
  EDIT_FILL_KPI_REPORT_ERROR,
  EDIT_FILL_KPI_REPORT_SUCCESS,
} from './constants';

// CREATE FILL_KPI_REPORT_FORM
export function createFillKpiReport(fillKpiReport) {
  return {
    type: CREATE_FILL_KPI_REPORT,
    fillKpiReport,
  };
}

export function createFillKpiReportFormError(error) {
  return {
    type: CREATE_FILL_KPI_REPORT_ERROR,
    error,
  };
}

export function fillKpiReportCreated(fillKpiReport) {
  return {
    type: CREATE_FILL_KPI_REPORT_SUCCESS,
    fillKpiReport,
  };
}
// END CREATE FILL_KPI_REPORT_FORM

// EDIT FILL_KPI_REPORT_FORM
export function editFillKpiReport(fillKpiReport) {
  return {
    type: EDIT_FILL_KPI_REPORT,
    fillKpiReport,
  };
}

export function editFillKpiReportError(error) {
  return {
    type: EDIT_FILL_KPI_REPORT_ERROR,
    error,
  };
}

export function fillKpiReportEdited(fillKpiReport) {
  return {
    type: EDIT_FILL_KPI_REPORT_SUCCESS,
    fillKpiReport,
  };
}
// END EDIT FILL_KPI_REPORT_FORM

// REMOVE FILL_KPI_REPORT_FORM
export function removeFillKpiReportForm(id) {
  return {
    type: REMOVE_FILL_KPI_REPORT,
    id,
  };
}

export function removeFillKpiReportError(error) {
  return {
    type: REMOVE_FILL_KPI_REPORT_ERROR,
    error,
  };
}

export function fillKpiReportRemoved(id) {
  return {
    type: REMOVE_FILL_KPI_REPORT_SUCCESS,
    id,
  };
}

// END REMOVE FILL_KPI_REPORT_FORM
