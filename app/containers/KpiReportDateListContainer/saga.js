import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_KPI_REPORT_DATES } from './constants';
import {
  loadKpiReportDatesError,
  kpiReportDatesLoaded,
  loadKpiReportDates,
} from './actions';
import { normalizeKpiReportDates } from './normalizr';
import { API_URL } from '../../utils/constants';
import { EDIT_FILL_KPI_REPORT_SUCCESS } from '../FillKpiReportFormContainer/constants';

export default function* kpiReportDatesData() {
  yield all([
    takeLatest(LOAD_KPI_REPORT_DATES, getAllKpiReportDates),
    takeLatest(EDIT_FILL_KPI_REPORT_SUCCESS, reloadAllKpiReportDates),
  ]);
}

export function* reloadAllKpiReportDates() {
  yield put(loadKpiReportDates());
}

export function* getAllKpiReportDates({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/kpiReportDate`, params);
    const { total: totalCount, limit } = response.data;
    let kpiReportDates = response.data.items.length
      ? normalizeKpiReportDates(response.data.items).entities.kpiReportDates
      : {};
    kpiReportDates = fromJS(kpiReportDates);
    yield put(kpiReportDatesLoaded(kpiReportDates, totalCount, limit));
  } catch (error) {
    yield put(loadKpiReportDatesError(error));
  }
}
