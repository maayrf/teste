import moment from 'moment';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_PERFORMANCE_INDEX_CHARTS } from './constants';
import {
  loadPerformanceIndexChartsError,
  performanceIndexChartsLoaded,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* performanceIndexChartsData() {
  yield all([
    takeLatest(LOAD_PERFORMANCE_INDEX_CHARTS, getAllPerformanceIndexCharts),
  ]);
}

function formatData(performanceIndexCharts) {
  return performanceIndexCharts.map((pic) => ({
    ...pic,
    startDate: moment(pic.startDate),
    endDate: moment(pic.endDate),
  }));
}

export function* getAllPerformanceIndexCharts({ params }) {
  try {
    let performanceIndexCharts = yield call(
      getRequest,
      `${API_URL}/performanceIndex`,
      params
    );
    performanceIndexCharts = performanceIndexCharts.data.items;
    performanceIndexCharts = fromJS(formatData(performanceIndexCharts));
    yield put(performanceIndexChartsLoaded(performanceIndexCharts));
  } catch (error) {
    yield put(loadPerformanceIndexChartsError(error));
  }
}
