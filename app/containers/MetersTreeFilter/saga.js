import { fromJS } from 'immutable';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_METERS } from './constants';

import { API_URL } from '../../utils/constants';
import { loadMetersError, metersLoaded } from './actions';

export default function* metersData() {
  yield all([takeLatest(LOAD_METERS, getAllMeters)]);
}

export function* getAllMeters({ params }) {
  try {
    let meters = yield call(getRequest, `${API_URL}/branch`, params);
    meters = meters.data.items;
    meters = fromJS(meters);
    yield put(metersLoaded(meters));
  } catch (error) {
    yield put(loadMetersError(error));
  }
}
