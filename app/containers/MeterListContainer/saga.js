import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_METERS } from './constants';
import { loadMetersError, metersLoaded } from './actions';
import { normalizeMeters } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* metersData() {
  yield all([takeLatest(LOAD_METERS, getAllMeters)]);
}

export function* getAllMeters({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/egg`, params);
    const { total: totalCount, limit } = response.data;
    let meters = response.data.items;
    meters = meters.length ? normalizeMeters(meters).entities.meters : {};
    meters = fromJS(meters);
    yield put(metersLoaded(meters, totalCount, limit));
  } catch (error) {
    yield put(loadMetersError(error));
  }
}
