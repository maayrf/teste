import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_DEMAND_EXCEED_CHART_CONTAINERS } from './constants';
import {
  loadDemandExceedChartContainersError,
  demandExceedChartContainersLoaded,
} from './actions';
import { normalizeDemandExceedChartContainers } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* demandExceedChartContainersData() {
  yield all([
    takeLatest(
      LOAD_DEMAND_EXCEED_CHART_CONTAINERS,
      getAllDemandExceedChartContainers
    ),
  ]);
}

export function* getAllDemandExceedChartContainers({ params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/powerDemandExceeding`,
      params
    );
    let { powerDemands, demandExceed, summaries } = response.data;
    powerDemands = fromJS(powerDemands);
    demandExceed = fromJS(demandExceed);
    summaries = fromJS(summaries);
    yield put(demandExceedChartContainersLoaded(powerDemands, demandExceed, summaries));
  } catch (error) {
    yield put(loadDemandExceedChartContainersError(error));
  }
}
