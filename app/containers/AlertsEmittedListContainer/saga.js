import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import moment from 'moment';
import { getRequest, putRequest } from '../../utils/request';
import { LOAD_ALERTS_EMITTED, CHANGE_ALERTS_EMITTED_STATUS } from './constants';
import {
  loadAlertsEmittedError,
  alertsEmittedLoaded,
  changeAlertsEmittedStatusError,
  alertsEmittedStatusChanged,
} from './actions';
import { normalizeAlertsEmitted } from './normalizr';
import { API_URL } from '../../utils/constants';
import openNotificationWithIcon from '../../utils/antd-notification';

export default function* alertsEmittedData() {
  yield all([
    takeLatest(LOAD_ALERTS_EMITTED, getAllAlertsEmitted),
    takeLatest(CHANGE_ALERTS_EMITTED_STATUS, changeAlertStatus),
  ]);
}

export function* changeAlertStatus({ alerts, onSuccess }) {
  try {
    yield call(putRequest, `${API_URL}/alertEmitted/status`, alerts);
    yield put(alertsEmittedStatusChanged());
    onSuccess();
  } catch (error) {
    yield put(changeAlertsEmittedStatusError(error));
    openNotificationWithIcon('error', error);
  }
}
function formatData(alertsEmitted) {
  return alertsEmitted.map((alertEmitted) => ({
    ...alertEmitted,
    alertTime: moment(alertEmitted.alertTime),
  }));
}
export function* getAllAlertsEmitted({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/alertEmitted`, params);
    const { total: totalCount, limit, offset } = response.data;
    let alertsEmitted = response.data.items.length
      ? normalizeAlertsEmitted(formatData(response.data.items)).entities
        .alertsEmitted
      : {};
    alertsEmitted = fromJS(alertsEmitted);
    yield put(alertsEmittedLoaded(alertsEmitted, totalCount, limit, offset));
  } catch (error) {
    yield put(loadAlertsEmittedError(error));
  }
}
