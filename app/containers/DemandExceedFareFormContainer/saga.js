import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_DEMAND_EXCEED_FARE,
  EDIT_DEMAND_EXCEED_FARE,
  REMOVE_DEMAND_EXCEED_FARE,
} from './constants';
import {
  createDemandExceedFareError,
  editDemandExceedFareError,
  demandExceedCreated,
  demandExceedFareEdited,
  demandExceedFareRemoved,
  removeDemandExceedFareError,
} from './actions';
import { API_URL } from '../../utils/constants';

const formatDemandExceedFareToRequest = (demandExceedFare) => ({
  ...demandExceedFare,
  startDate: demandExceedFare.startDate
    ? demandExceedFare.startDate.format('YYYY-MM-DD')
    : '',
  endDate: demandExceedFare.endDate
    ? demandExceedFare.endDate.format('YYYY-MM-DD')
    : '',
  rushStartTime: demandExceedFare.rushStartTime.format('HH:mm'),
  rushEndTime: demandExceedFare.rushEndTime.format('HH:mm'),
});

export default function* demandExceedFareData() {
  yield all([
    takeLatest(CREATE_DEMAND_EXCEED_FARE, createDemandExceedFareForm),
    takeLatest(EDIT_DEMAND_EXCEED_FARE, editDemandExceedFareForm),
    takeLatest(REMOVE_DEMAND_EXCEED_FARE, removeDemandExceedFare),
  ]);
}

function* createDemandExceedFareForm({ demandExceedFare }) {
  try {
    const demandExceedFareForm = yield call(
      postRequest,
      `${API_URL}/demandExceedingFare`,
      formatDemandExceedFareToRequest(demandExceedFare)
    );
    yield put(demandExceedCreated(demandExceedFareForm.data));
  } catch (error) {
    yield put(createDemandExceedFareError(error));
  }
}

function* editDemandExceedFareForm({ demandExceedFare }) {
  try {
    const demandExceedFareForm = yield call(
      putRequest,
      `${API_URL}/demandExceedingFare/${demandExceedFare.id}`,
      formatDemandExceedFareToRequest(demandExceedFare)
    );
    yield put(demandExceedFareEdited(demandExceedFareForm.data));
  } catch (error) {
    yield put(editDemandExceedFareError(error));
  }
}

function* removeDemandExceedFare({ id, resolve, reject }) {
  try {
    yield call(deleteRequest, `${API_URL}/demandExceedingFare/${id}`);
    yield put(demandExceedFareRemoved(id));
    resolve(id);
  } catch (error) {
    yield put(removeDemandExceedFareError(id, error));
    reject(error);
  }
}
