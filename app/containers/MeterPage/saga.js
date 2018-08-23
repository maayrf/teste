import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { deleteRequest, getRequest, putRequest } from '../../utils/request';
import { EDIT_METER, LOAD_PENDING_METERS, REMOVE_METER } from './constants';
import {
  editMeterError,
  loadPendingMetersError,
  meterEdited,
  meterRemoved,
  pendingMetersLoaded,
  removeMeterError,
} from './actions';
import { normalizePendingMeters } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* pendingMetersData() {
  yield all([
    takeLatest(LOAD_PENDING_METERS, getAllPendingMeters),
    takeLatest(EDIT_METER, editMeter),
    takeLatest(REMOVE_METER, removeMeter),
  ]);
}

export function* getAllPendingMeters({ params }) {
  try {
    let pendingMeters = yield call(getRequest, `${API_URL}/egg`, {
      searchPending: true,
      ...params,
    });
    pendingMeters = pendingMeters.data.items;
    pendingMeters = pendingMeters.length
      ? normalizePendingMeters(pendingMeters).entities.pendingMeters
      : {};
    pendingMeters = fromJS(pendingMeters);
    yield put(pendingMetersLoaded(pendingMeters));
  } catch (error) {
    yield put(loadPendingMetersError(error));
  }
}

export function* editMeter({ resolve, reject, ...action }) {
  try {
    const meter = yield call(
      putRequest,
      `${API_URL}/meters/${action.meter.id}`,
      action.meter
    );
    yield put(meterEdited(meter));
    resolve(meter);
  } catch (error) {
    yield put(editMeterError(error));
    reject(error);
  }
}

export function* removeMeter({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/meters/${id}`);
    yield put(meterRemoved(id));
  } catch (error) {
    yield put(removeMeterError(id, error));
  }
}
