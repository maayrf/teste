import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_REPORT,
  CREATE_REPORT_SUCCESS,
  EDIT_REPORT,
  REMOVE_REPORT,
} from './constants';
import {
  createReportError,
  editReportError,
  reportCreated,
  reportEdited,
  reportRemoved,
  removeReportError,
} from './actions';
import { API_URL } from '../../utils/constants';
import { formatToMeterSelectionFilter } from '../../utils/formatToMeterSelectionFilter';
import { loadReports } from '../ReportListContainer/actions';

export default function* reportsData() {
  yield all([
    takeLatest(CREATE_REPORT, createReport),
    takeLatest(EDIT_REPORT, editReport),
    takeLatest(REMOVE_REPORT, removeReport),
    takeLatest(CREATE_REPORT_SUCCESS, reportReload),
  ]);
}

function* reportReload() {
  yield put(loadReports());
}

export function* createReport({ resolve, reject, ...action }) {
  try {
    let report = yield call(
      postRequest,
      `${API_URL}/report`,
      formatToMeterSelectionFilter(action.report)
    );
    report = report.data;
    yield put(reportCreated(report));
    resolve(report);
  } catch (error) {
    yield put(createReportError(error));
    reject(error);
  }
}

export function* editReport({ resolve, reject, ...action }) {
  try {
    const report = yield call(
      putRequest,
      `${API_URL}/report/${action.report.id}`,
      action.report
    );
    yield put(reportEdited(report));
    resolve(report);
  } catch (error) {
    yield put(editReportError(error));
    reject(error);
  }
}

export function* removeReport({ resolve, reject, id }) {
  try {
    yield call(deleteRequest, `${API_URL}/report/${id}`);
    yield put(reportRemoved(id));
    yield resolve(id);
  } catch (error) {
    yield put(removeReportError(error));
    yield reject(error);
  }
}
