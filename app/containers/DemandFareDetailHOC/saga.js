import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../utils/constants';
import { LOAD_DEMAND_FARE_BY_ID } from './constants';
import { loadDemandFareByIdError, demandFareByIdLoaded } from './actions';

export default function* demandFareData() {
  yield all([takeLatest(LOAD_DEMAND_FARE_BY_ID, loadDemandFareById)]);
}

export function* loadDemandFareById({ id }) {
  try {
    const demandFare = yield call(getRequest, `${API_URL}/demandFare/${id}`);
    yield put(demandFareByIdLoaded(demandFare.data));
  } catch (error) {
    yield put(loadDemandFareByIdError(error));
  }
}
