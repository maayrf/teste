import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_ALERT_CONFIGURATION,
  EDIT_ALERT_CONFIGURATION,
  REMOVE_ALERT_CONFIGURATION,
} from './constants';
import {
  createAlertConfigurationFormError,
  editAlertConfigurationError,
  alertConfigurationCreated,
  alertConfigurationEdited,
  alertConfigurationRemoved,
  removeAlertConfigurationError,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* alertConfigurationData() {
  yield all([
    takeLatest(CREATE_ALERT_CONFIGURATION, createAlertConfigurationForm),
    takeLatest(EDIT_ALERT_CONFIGURATION, editAlertConfigurationForm),
    takeLatest(REMOVE_ALERT_CONFIGURATION, removeAlertConfiguration),
  ]);
}

function formatDate(alertConfiguration) {
  const newAlertConfiguration = alertConfiguration;
  if (alertConfiguration.rangeDatesToCompare) {
    newAlertConfiguration.rangeDatesToCompare = {
      startDate: newAlertConfiguration.rangeDatesToCompare.startDate.format('YYYY-MM-DD'),
      endDate: newAlertConfiguration.rangeDatesToCompare.endDate.format('YYYY-MM-DD'),
    };
  }
  return newAlertConfiguration;
}
export function* createAlertConfigurationForm({ alertConfiguration }) {
  try {
    const alertConfigurationForm = yield call(
      postRequest,
      `${API_URL}/alertConfiguration`,
      formatDate(alertConfiguration)
    );
    yield put(alertConfigurationCreated(alertConfigurationForm.data));
  } catch (error) {
    yield put(createAlertConfigurationFormError(error));
  }
}

export function* editAlertConfigurationForm({ alertConfiguration }) {
  try {
    const alertConfigurationForm = yield call(
      putRequest,
      `${API_URL}/alertConfiguration/${alertConfiguration.id}`,
      formatDate(alertConfiguration)
    );
    yield put(alertConfigurationEdited(alertConfigurationForm.data));
  } catch (error) {
    yield put(editAlertConfigurationError(error));
  }
}

export function* removeAlertConfiguration({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/alertConfiguration/${id}`);
    yield put(alertConfigurationRemoved(id));
  } catch (error) {
    yield put(removeAlertConfigurationError(id, error));
  }
}
