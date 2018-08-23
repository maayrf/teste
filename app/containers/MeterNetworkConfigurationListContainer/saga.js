import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_METER_NETWORK_CONFIGURATIONS } from './constants';
import {
  loadMeterNetworkConfigurationsError,
  meterNetworkConfigurationsLoaded,
} from './actions';
import { normalizeMeterNetworkConfigurations } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* meterNetworkConfigurationsSaga() {
  yield all([
    takeLatest(
      LOAD_METER_NETWORK_CONFIGURATIONS,
      getAllMeterNetworkConfigurations
    ),
  ]);
}

export function* getAllMeterNetworkConfigurations({ params, meterId }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/egg/${meterId}/networkConfiguration`,
      params
    );
    const { total: totalCount, limit } = response.data;
    let meterNetworkConfigurations = response.data.items.length
      ? normalizeMeterNetworkConfigurations(response.data.items).entities
        .meterNetworkConfigurations
      : {};
    meterNetworkConfigurations = fromJS(meterNetworkConfigurations);
    yield put(meterNetworkConfigurationsLoaded(
      meterNetworkConfigurations,
      totalCount,
      limit
    ));
  } catch (error) {
    yield put(loadMeterNetworkConfigurationsError(error));
  }
}
