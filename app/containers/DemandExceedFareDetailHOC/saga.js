import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../utils/constants';
import { LOAD_DEMAND_EXCEED_FARE_BY_ID } from './constants';
import {
  loadDemandExceedFareByIdError,
  demandExceedFareByIdLoaded,
} from './actions';

export default function* demandExceedFareData() {
  yield all([
    takeLatest(LOAD_DEMAND_EXCEED_FARE_BY_ID, loadDemandExceedFareById),
  ]);
}

export function* loadDemandExceedFareById({ id }) {
  try {
    const demandExceedFare = yield call(
      getRequest,
      `${API_URL}/demandExceedingFare/${id}`
    );
    yield put(demandExceedFareByIdLoaded(demandExceedFare.data));
  } catch (error) {
    yield put(loadDemandExceedFareByIdError(error));
  }
}
