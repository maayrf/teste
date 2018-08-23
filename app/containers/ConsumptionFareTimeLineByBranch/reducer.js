import { fromJS } from 'immutable';
import {
  LOAD_CONSUMPTION_FARES_BY_BRANCH,
  LOAD_CONSUMPTION_FARES_BY_BRANCH_SUCCESS,
  LOAD_CONSUMPTION_FARES_BY_BRANCH_ERROR,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: null,
  consumptionFares: [],
  totalCount: 0,
  limit: 15,
  offset: null,
});

function consumptionFareByBranchReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONSUMPTION_FARES_BY_BRANCH:
      return state.set('loading', true).set('error', null);
    case LOAD_CONSUMPTION_FARES_BY_BRANCH_SUCCESS:
      return state
        .set('consumptionFares', fromJS(action.consumptionFares))
        .set('loading', false)
        .set('totalCount', Number(action.totalCount))
        .set('limit', action.limit)
        .set('offset', action.offset);
    case LOAD_CONSUMPTION_FARES_BY_BRANCH_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default consumptionFareByBranchReducer;
