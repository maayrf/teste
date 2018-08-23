import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest } from '../../utils/request';
import { REMOVE_ALERT_CONFIGURATION } from './constants';
import { API_URL } from '../../utils/constants';
import {
  alertConfigurationRemoved,
  removeAlertConfigurationError,
} from './actions';

export default function* demandExceedFareData() {
  yield all([takeLatest(REMOVE_ALERT_CONFIGURATION, removeAlertConfiguration)]);
}

export function* removeAlertConfiguration({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/alertConfiguration/${id}`);
    yield put(alertConfigurationRemoved(id));
  } catch (error) {
    yield put(removeAlertConfigurationError(id, error));
  }
}
