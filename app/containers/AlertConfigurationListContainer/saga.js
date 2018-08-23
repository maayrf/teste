import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import moment from 'moment';
import { getRequest } from '../../utils/request';
import { LOAD_ALERT_CONFIGURATIONS } from './constants';
import {
  loadAlertConfigurationsError,
  alertConfigurationsLoaded,
  loadAlertConfigurations,
} from './actions';
import { normalizeAlertConfigurations } from './normalizr';
import { API_URL } from '../../utils/constants';
import { REMOVE_ALERT_CONFIGURATION_SUCCESS } from '../RemoveAlertConfigurationConfirm/constants';

export default function* alertConfigurationsData() {
  yield all([
    takeLatest(LOAD_ALERT_CONFIGURATIONS, getAllAlertConfigurations),
    takeLatest(
      REMOVE_ALERT_CONFIGURATION_SUCCESS,
      reloadAllAlertConfigurations
    ),
  ]);
}
function formatData(alertConfigurations) {
  return alertConfigurations.map((alertConfiguration) => ({
    ...alertConfiguration,
    createdAt: moment(alertConfiguration.createdAt),
    updatedAt: moment(alertConfiguration.updatedAt),
  }));
}
export function* reloadAllAlertConfigurations() {
  yield put(loadAlertConfigurations());
}

export function* getAllAlertConfigurations({ params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/alertConfiguration`,
      params
    );
    const { total: totalCount, limit, offset } = response.data;
    let alertConfigurations = response.data.items.length
      ? normalizeAlertConfigurations(formatData(response.data.items)).entities
        .alertConfigurations
      : {};
    alertConfigurations = fromJS(alertConfigurations);
    yield put(alertConfigurationsLoaded(alertConfigurations, totalCount, limit, offset));
  } catch (error) {
    yield put(loadAlertConfigurationsError(error));
  }
}
