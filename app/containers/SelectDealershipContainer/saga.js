import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_SELECT_DEALERSHIPS } from './constants';
import { loadSelectDealershipsError, selectDealershipsLoaded } from './actions';
import { normalizeSelectDealerships } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* selectDealershipsData() {
  yield all([takeLatest(LOAD_SELECT_DEALERSHIPS, getAllSelectDealerships)]);
}

export function* getAllSelectDealerships() {
  try {
    let selectDealerships = yield call(
      getRequest,
      `${API_URL}/selectDealerships`
    );
    selectDealerships = selectDealerships.data.items;
    selectDealerships = selectDealerships.length
      ? normalizeSelectDealerships(selectDealerships).entities.selectDealerships
      : {};
    selectDealerships = fromJS(selectDealerships);
    yield put(selectDealershipsLoaded(selectDealerships));
  } catch (error) {
    yield put(loadSelectDealershipsError(error));
  }
}
