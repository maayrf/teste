import { fromJS } from 'immutable';
import {
  LOAD_DEMAND_EXCEED_CHART_CONTAINERS,
  LOAD_DEMAND_EXCEED_CHART_CONTAINERS_SUCCESS,
  LOAD_DEMAND_EXCEED_CHART_CONTAINERS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  powerDemands: [],
  demandExceed: {},
  summaries: [],
});

function demandExceedChartContainerReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEMAND_EXCEED_CHART_CONTAINERS:
      return state.set('loading', true).set('error', null);
    case LOAD_DEMAND_EXCEED_CHART_CONTAINERS_SUCCESS:
      return state
        .set('loading', false)
        .set('powerDemands', action.powerDemands)
        .set('demandExceed', action.demandExceed)
        .set('summaries', action.summaries);
    case LOAD_DEMAND_EXCEED_CHART_CONTAINERS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default demandExceedChartContainerReducer;
