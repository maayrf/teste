import { fromJS } from 'immutable';
import {
  LOAD_DEMAND_EXCEED_FARES_BY_BRANCH,
  LOAD_DEMAND_EXCEED_FARES_BY_BRANCH_SUCCESS,
  LOAD_DEMAND_EXCEED_FARES_BY_BRANCH_ERROR,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: null,
  demandExceedFares: [],
  totalCount: 0,
  limit: 15,
  offset: null,
});

function demandExceedFaresByBranchReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEMAND_EXCEED_FARES_BY_BRANCH:
      return state.set('loading', true).set('error', null);
    case LOAD_DEMAND_EXCEED_FARES_BY_BRANCH_SUCCESS:
      return state
        .set('demandExceedFares', fromJS(action.demandExceedFares))
        .set('loading', false)
        .set('totalCount', Number(action.totalCount))
        .set('limit', action.limit)
        .set('offset', action.offset);
    case LOAD_DEMAND_EXCEED_FARES_BY_BRANCH_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default demandExceedFaresByBranchReducer;
