import { fromJS } from 'immutable';
import {
  LOAD_CURRENT_FARES_BY_BRANCH,
  LOAD_CURRENT_FARES_BY_BRANCH_SUCCESS,
  LOAD_CURRENT_FARES_BY_BRANCH_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  consumptionFare: null,
  demandFare: null,
  demandExceedFare: null,
});

function branchFaresReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CURRENT_FARES_BY_BRANCH:
      return state.set('loading', true).set('error', null);
    case LOAD_CURRENT_FARES_BY_BRANCH_SUCCESS:
      return state
        .set('loading', false)
        .set('consumptionFare', action.consumptionFare)
        .set('demandFare', action.demandFare)
        .set('demandExceedFare', action.demandExceedFare);
    case LOAD_CURRENT_FARES_BY_BRANCH_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default branchFaresReducer;
