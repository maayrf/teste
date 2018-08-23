import { takeLatest, call, put, all } from 'redux-saga/effects';
import { openNotificationWithIcon } from '../../utils/antd-notification';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_DEMAND_FARE,
  EDIT_DEMAND_FARE,
  REMOVE_DEMAND_FARE,
} from './constants';
import {
  createDemandFareError,
  editDemandFareError,
  demandFareCreated,
  demandFareEdited,
  demandFareRemoved,
  removeDemandFareError,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* demandExceedFareData() {
  yield all([
    takeLatest(CREATE_DEMAND_FARE, createDemandFareForm),
    takeLatest(EDIT_DEMAND_FARE, editDemandFareForm),
    takeLatest(REMOVE_DEMAND_FARE, removeDemandFare),
  ]);
}

const formatDemandFareToRequest = (demandFare) => ({
  ...demandFare,
  startDate: demandFare.startDate
    ? demandFare.startDate.format('YYYY-MM-DD')
    : '',
  endDate: demandFare.endDate ? demandFare.endDate.format('YYYY-MM-DD') : '',
  rushStartTime: demandFare.rushStartTime.format('HH:mm'),
  rushEndTime: demandFare.rushEndTime.format('HH:mm'),
});

function* createDemandFareForm({ demandFare }) {
  try {
    const demandFareForm = yield call(
      postRequest,
      `${API_URL}/demandFare`,
      formatDemandFareToRequest(demandFare)
    );
    yield put(demandFareCreated(demandFareForm.data));
  } catch (error) {
    yield put(createDemandFareError(error));
  }
}

function* editDemandFareForm({ demandFare }) {
  try {
    const demandFareForm = yield call(
      putRequest,
      `${API_URL}/demandFare/${demandFare.id}`,
      formatDemandFareToRequest(demandFare)
    );
    yield put(demandFareEdited(demandFareForm.data));
  } catch (error) {
    yield put(editDemandFareError(error));
  }
}

function* removeDemandFare({ id, resolve, reject }) {
  try {
    yield call(deleteRequest, `${API_URL}/demandFare/${id}`);
    yield put(demandFareRemoved(id));
    resolve(id);
  } catch (error) {
    yield put(removeDemandFareError(error));
    reject(error);
  }
}
