import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_CONSUMPTION_BY_RANGE_SUMMARY } from './constants';
import {
  loadConsumptionByRangeSummaryError,
  consumptionByRangeSummaryLoaded,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* consumptionByRangeSummaryData() {
  yield all([
    takeLatest(
      LOAD_CONSUMPTION_BY_RANGE_SUMMARY,
      getAllConsumptionByRangeSummary
    ),
  ]);
}

function formatDataToRequest(requestData) {
  return {
    ...requestData,
    startDate: requestData.startDate.format('YYYY-MM-DD'),
    endDate: requestData.endDate.format('YYYY-MM-DD'),
  };
}
export function* getAllConsumptionByRangeSummary({ params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/consumptionSummary`,
      formatDataToRequest(params)
    );
    let consumptionByRangeSummary = response.data ? response.data : {};
    consumptionByRangeSummary = fromJS(consumptionByRangeSummary);
    yield put(consumptionByRangeSummaryLoaded(consumptionByRangeSummary));
  } catch (error) {
    yield put(loadConsumptionByRangeSummaryError(error));
  }
}
