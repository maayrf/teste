import { fromJS } from 'immutable';
import {
  LOAD_CONSUMPTION_BY_RANGE_SUMMARY,
  LOAD_CONSUMPTION_BY_RANGE_SUMMARY_SUCCESS,
  LOAD_CONSUMPTION_BY_RANGE_SUMMARY_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  consumptionByRangeSummary: {},
});

function consumptionByRangeSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONSUMPTION_BY_RANGE_SUMMARY:
      return state.set('loading', true).set('error', null);
    case LOAD_CONSUMPTION_BY_RANGE_SUMMARY_SUCCESS:
      return state
        .set('loading', false)
        .set('consumptionByRangeSummary', action.consumptionByRangeSummary);
    case LOAD_CONSUMPTION_BY_RANGE_SUMMARY_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default consumptionByRangeSummaryReducer;
