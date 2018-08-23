import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_POWER_BY_RANGE_SUMMARY } from './constants';
import {
  loadPowerByRangeSummaryError,
  powerByRangeSummaryLoaded,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* powerByRangeSummaryData() {
  yield all([
    takeLatest(LOAD_POWER_BY_RANGE_SUMMARY, getAllPowerByRangeSummary),
  ]);
}

function formatDataToRequest(requestData) {
  return {
    ...requestData,
    startDate: requestData.startDate.format('YYYY-MM-DD'),
    endDate: requestData.endDate.format('YYYY-MM-DD'),
  };
}
export function* getAllPowerByRangeSummary({ params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/powerSummary`,
      formatDataToRequest(params)
    );
    let powerByRangeSummary = response.data ? response.data : {};
    powerByRangeSummary = fromJS(powerByRangeSummary);
    yield put(powerByRangeSummaryLoaded(powerByRangeSummary));
  } catch (error) {
    yield put(loadPowerByRangeSummaryError(error));
  }
}
