import { fromJS } from 'immutable';
import {
  LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY,
  LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY_SUCCESS,
  LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  financialCostByRangeSummary: {},
});

function financialCostByRangeSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY:
      return state.set('loading', true).set('error', null);
    case LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY_SUCCESS:
      return state
        .set('loading', false)
        .set('financialCostByRangeSummary', action.financialCostByRangeSummary);
    case LOAD_FINANCIAL_COST_BY_RANGE_SUMMARY_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default financialCostByRangeSummaryReducer;
