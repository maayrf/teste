import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_CONSUMPTION_FARE,
  EDIT_CONSUMPTION_FARE,
  REMOVE_CONSUMPTION_FARE,
} from './constants';
import {
  createConsumptionFareError,
  editConsumptionFareError,
  consumptionFareCreated,
  consumptionFareEdited,
  consumptionFareRemoved,
  removeConsumptionFareError,
} from './actions';
import { API_URL } from '../../utils/constants';

const formatConsumptionFareToRequest = (consumptionFare) => ({
  ...consumptionFare,
  startDate: consumptionFare.startDate
    ? consumptionFare.startDate.format('YYYY-MM-DD')
    : '',
  endDate: consumptionFare.endDate
    ? consumptionFare.endDate.format('YYYY-MM-DD')
    : '',
  rushStartTime: consumptionFare.rushStartTime.format('HH:mm'),
  rushEndTime: consumptionFare.rushEndTime.format('HH:mm'),
});

export default function* consumptionFareFormSaga() {
  yield all([
    takeLatest(CREATE_CONSUMPTION_FARE, createConsumptionFareForm),
    takeLatest(EDIT_CONSUMPTION_FARE, editConsumptionFareForm),
    takeLatest(REMOVE_CONSUMPTION_FARE, removeConsumptionFare),
  ]);
}
function* createConsumptionFareForm({ consumptionFare }) {
  try {
    const consumptionFareForm = yield call(
      postRequest,
      `${API_URL}/consumptionFare`,
      formatConsumptionFareToRequest(consumptionFare)
    );
    yield put(consumptionFareCreated(consumptionFareForm.data));
  } catch (error) {
    yield put(createConsumptionFareError(error));
  }
}

export function* editConsumptionFareForm({ consumptionFare }) {
  try {
    const consumptionFareForm = yield call(
      putRequest,
      `${API_URL}/consumptionFare/${consumptionFare.id}`,
      formatConsumptionFareToRequest(consumptionFare)
    );
    yield put(consumptionFareEdited(consumptionFareForm.data));
  } catch (error) {
    yield put(editConsumptionFareError(error));
  }
}

export function* removeConsumptionFare({ id, resolve, reject }) {
  try {
    yield call(deleteRequest, `${API_URL}/consumptionFare/${id}`);
    yield put(consumptionFareRemoved(id));
    resolve(id);
  } catch (error) {
    yield put(removeConsumptionFareError(error));
    reject(error);
  }
}
