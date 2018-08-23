import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_METER_NETWORK,
  EDIT_METER_NETWORK,
  REMOVE_METER_NETWORK,
} from './constants';
import {
  createMeterNetworkFormError,
  editMeterNetworkError,
  meterNetworkCreated,
  meterNetworkEdited,
  meterNetworkRemoved,
  removeMeterNetworkError,
} from './actions';
import { API_URL, CONTENT_TYPE_FORM_DATA } from '../../utils/constants';

export default function* meterNetworkFormSaga() {
  yield all([
    takeLatest(CREATE_METER_NETWORK, createMeterNetworkForm),
    takeLatest(EDIT_METER_NETWORK, editMeterNetworkForm),
    takeLatest(REMOVE_METER_NETWORK, removeMeterNetwork),
  ]);
}

export function* createMeterNetworkForm({ meterNetwork, meterId }) {
  try {
    const meterNetworkForm = yield call(
      postRequest,
      `${API_URL}/egg/${meterId}/networkConfiguration`,
      meterNetwork,
      { contentType: CONTENT_TYPE_FORM_DATA }
    );
    yield put(meterNetworkCreated(meterNetworkForm.data));
  } catch (error) {
    yield put(createMeterNetworkFormError(error));
  }
}

export function* editMeterNetworkForm({ meterNetwork, meterId }) {
  try {
    const meterNetworkForm = yield call(
      putRequest,
      `${API_URL}/egg/${meterId}/networkConfiguration/${meterNetwork.id}`,
      meterNetwork
    );
    yield put(meterNetworkEdited(meterNetworkForm.data));
  } catch (error) {
    yield put(editMeterNetworkError(error));
  }
}

export function* removeMeterNetwork({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/networkConfiguration/${id}`);
    yield put(meterNetworkRemoved(id));
  } catch (error) {
    yield put(removeMeterNetworkError(id, error));
  }
}
