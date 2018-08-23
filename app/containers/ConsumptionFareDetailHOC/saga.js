import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../utils/constants';
import { LOAD_CONSUMPTION_FARE_BY_ID } from './constants';
import {
  loadConsumptionFareByIdError,
  consumptionFareByIdLoaded,
} from './actions';

export default function* consumptionFareData() {
  yield all([takeLatest(LOAD_CONSUMPTION_FARE_BY_ID, loadConsumptionFareById)]);
}

export function* loadConsumptionFareById({ id }) {
  try {
    const consumptionFare = yield call(
      getRequest,
      `${API_URL}/consumptionFare/${id}`
    );
    yield put(consumptionFareByIdLoaded(consumptionFare.data));
  } catch (error) {
    yield put(loadConsumptionFareByIdError(error));
  }
}
