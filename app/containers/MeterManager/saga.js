import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { deleteRequest, getRequest, putRequest } from '../../utils/request';
import {
  EDIT_METER,
  LOAD_PENDING_METERS,
  MOVE_METER,
  MOVE_METER_SUCCESS,
  REMOVE_METER,
} from './constants';
import {
  editMeterError,
  loadPendingMeters,
  loadPendingMetersError,
  meterEdited,
  meterMoved,
  meterRemoved,
  moveMeterError,
  pendingMetersLoaded,
  removeMeterError,
} from './actions';
import { normalizePendingMeters } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* pendingMetersData() {
  yield all([
    takeLatest(LOAD_PENDING_METERS, getAllPendingMeters),
    takeLatest(MOVE_METER_SUCCESS, reloadPendingMeters),
    takeLatest(EDIT_METER, editMeter),
    takeLatest(REMOVE_METER, removeMeter),
    takeLatest(MOVE_METER, moveMeter),
  ]);
}

export function* reloadPendingMeters() {
  yield put(loadPendingMeters());
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

export function* moveMeter({ resolve, reject, ...action }) {
  try {
    const meter = yield call(
      putRequest,
      `${API_URL}/meter/${action.meter.id}`,
      {
        nodeClass: action.meter.className,
        parentClass: action.parent.className,
        parentId: action.parent.id,
      }
    );
    yield put(meterMoved(meter));
    resolve(meter);
  } catch (error) {
    yield put(moveMeterError(error));
    reject(error);
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
