import { takeLatest, call, put, all } from 'redux-saga/effects';
import { postRequest, patchRequest } from '../../utils/request';
import { CREATE_FILL_KPI_REPORT, EDIT_FILL_KPI_REPORT } from './constants';
import {
  createFillKpiReportFormError,
  editFillKpiReportError,
  fillKpiReportFormCreated,
  fillKpiReportEdited,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* fillKpiReportData() {
  yield all([
    takeLatest(CREATE_FILL_KPI_REPORT, createFillKpiReportForm),
    takeLatest(EDIT_FILL_KPI_REPORT, editFillKpiReportForm),
  ]);
}

export function* createFillKpiReportForm({ fillKpiReport }) {
  try {
    const fillKpiReportForm = yield call(
      postRequest,
      `${API_URL}/kpiReport`,
      fillKpiReport
    );
    yield put(fillKpiReportFormCreated(fillKpiReportForm.data));
  } catch (error) {
    yield put(createFillKpiReportFormError(error));
  }
}

export function* editFillKpiReportForm({ fillKpiReport }) {
  try {
    const fillKpiReportForm = yield call(
      patchRequest,
      `${API_URL}/kpiReport`,
      fillKpiReport
    );
    yield put(fillKpiReportEdited(fillKpiReportForm.data));
  } catch (error) {
    yield put(editFillKpiReportError(error));
  }
}
