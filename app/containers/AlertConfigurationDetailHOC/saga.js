import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../utils/constants';
import { LOAD_ALERT_CONFIGURATION_BY_ID } from './constants';
import {
  loadAlertConfigurationByIdError,
  alertConfigurationByIdLoaded,
} from './actions';

export default function* alertConfigurationData() {
  yield all([
    takeLatest(LOAD_ALERT_CONFIGURATION_BY_ID, loadAlertConfigurationById),
  ]);
}

export function* loadAlertConfigurationById({ id }) {
  try {
    const alertConfiguration = yield call(
      getRequest,
      `${API_URL}/alertConfiguration/${id}`
    );
    yield put(alertConfigurationByIdLoaded(alertConfiguration.data));
  } catch (error) {
    yield put(loadAlertConfigurationByIdError(error));
  }
}
