import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_PERFORMANCE_CONFIGURATIONS } from './constants';
import {
  loadPerformanceConfigurationsError,
  performanceConfigurationsLoaded,
} from './actions';
import { normalizePerformanceConfigurations } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* performanceConfigurationsData() {
  yield all([
    takeLatest(
      LOAD_PERFORMANCE_CONFIGURATIONS,
      getAllPerformanceConfigurations
    ),
  ]);
}

export function* getAllPerformanceConfigurations({ params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/performanceConfiguration`,
      params
    );
    const { total: totalCount, limit } = response.data;
    let performanceConfigurations = response.data.items;
    performanceConfigurations = performanceConfigurations
      ? normalizePerformanceConfigurations(performanceConfigurations).entities
        .performanceConfigurations
      : {};
    performanceConfigurations = fromJS(performanceConfigurations);
    yield put(performanceConfigurationsLoaded(
      performanceConfigurations,
      totalCount,
      limit
    ));
  } catch (error) {
    console.log(error);

    yield put(loadPerformanceConfigurationsError(error));
  }
}
