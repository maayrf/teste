import {
  REMOVE_REPORT,
  REMOVE_REPORT_ERROR,
  REMOVE_REPORT_SUCCESS,
  CREATE_REPORT,
  CREATE_REPORT_ERROR,
  CREATE_REPORT_SUCCESS,
  EDIT_REPORT,
  EDIT_REPORT_ERROR,
  EDIT_REPORT_SUCCESS,
} from './constants';

// REPORT LOAD

// CREATE REPORT
export function createReport(report, resolve, reject) {
  return {
    type: CREATE_REPORT,
    report,
    resolve,
    reject,
  };
}

export function createReportError(error) {
  return {
    type: CREATE_REPORT_ERROR,
    error,
  };
}

export function reportCreated(report) {
  return {
    type: CREATE_REPORT_SUCCESS,
    report,
  };
}
// END CREATE REPORT

// EDIT REPORT
export function editReport(report, resolve, reject) {
  return {
    type: EDIT_REPORT,
    report,
    resolve,
    reject,
  };
}

export function editReportError(error) {
  return {
    type: EDIT_REPORT_ERROR,
    error,
  };
}

export function reportEdited(report) {
  return {
    type: EDIT_REPORT_SUCCESS,
    report,
  };
}
// END EDIT REPORT

// REMOVE REPORT
export function removeReport(id, resolve, reject) {
  return {
    type: REMOVE_REPORT,
    id,
    resolve,
    reject,
  };
}

export function removeReportError(error) {
  return {
    type: REMOVE_REPORT_ERROR,
    error,
  };
}

export function reportRemoved(id) {
  return {
    type: REMOVE_REPORT_SUCCESS,
    id,
  };
}

// END REMOVE REPORT
