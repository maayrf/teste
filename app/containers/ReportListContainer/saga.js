import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_REPORTS } from './constants';
import { loadReportsError, reportsLoaded } from './actions';
import { normalizeReports } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* reportsSaga() {
  yield all([takeLatest(LOAD_REPORTS, getAllReports)]);
}

export function* getAllReports({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/report`, params);
    const { total: totalCount, limit, offset } = response.data;
    let reports = response.data.items;
    reports = reports.length ? normalizeReports(reports).entities.reports : {};
    reports = fromJS(reports);
    yield put(reportsLoaded(reports, totalCount, limit, offset));
  } catch (error) {
    yield put(loadReportsError(error));
  }
}
