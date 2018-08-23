import { fromJS } from 'immutable';
import {
  LOAD_KPI_REPORT_DATES,
  LOAD_KPI_REPORT_DATES_SUCCESS,
  LOAD_KPI_REPORT_DATES_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  kpiReportDates: {},
  totalCount: 0,
  limit: 15,
});

function kpiReportDateReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_KPI_REPORT_DATES:
      return state.set('loading', true).set('error', null);
    case LOAD_KPI_REPORT_DATES_SUCCESS:
      return state
        .set('loading', false)
        .set('kpiReportDates', action.kpiReportDates)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit);
    case LOAD_KPI_REPORT_DATES_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default kpiReportDateReducer;
