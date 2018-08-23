import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY } from './constants';
import {
  loadFinancialCostByRangeSummaryError,
  financialCostByRangeSummaryLoaded,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* financialCostByRangeSummaryData() {
  yield all([
    takeLatest(
      LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY,
      getAllFinancialCostByRangeSummary
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
export function* getAllFinancialCostByRangeSummary({ params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/financialCostSummary`,
      formatDataToRequest(params)
    );
    let financialCostByRangeSummary = response.data ? response.data : {};
    financialCostByRangeSummary = fromJS(financialCostByRangeSummary);
    yield put(financialCostByRangeSummaryLoaded(financialCostByRangeSummary));
  } catch (error) {
    yield put(loadFinancialCostByRangeSummaryError(error));
  }
}
