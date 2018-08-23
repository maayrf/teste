import { fromJS } from 'immutable';
import {
  LOAD_PERFORMANCE_INDEX_CHARTS,
  LOAD_PERFORMANCE_INDEX_CHARTS_SUCCESS,
  LOAD_PERFORMANCE_INDEX_CHARTS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  performanceIndexCharts: {},
});

function performanceIndexChartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PERFORMANCE_INDEX_CHARTS:
      return state.set('loading', true).set('error', null);
    case LOAD_PERFORMANCE_INDEX_CHARTS_SUCCESS:
      return state
        .set('loading', false)
        .set('performanceIndexCharts', action.performanceIndexCharts);
    case LOAD_PERFORMANCE_INDEX_CHARTS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default performanceIndexChartReducer;
