import { fromJS } from 'immutable';
import {
  LOAD_REPORTS,
  LOAD_REPORTS_SUCCESS,
  LOAD_REPORTS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  reports: {},
  totalCount: 0,
  limit: 12,
  offset: 0,
});

function reportsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPORTS:
      return state.set('loading', true).set('error', null);
    case LOAD_REPORTS_SUCCESS:
      return state
        .set('loading', false)
        .set('reports', action.reports)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit)
        .set('offset', action.offset);
    case LOAD_REPORTS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default reportsReducer;
