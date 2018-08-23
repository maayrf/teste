import { fromJS } from 'immutable';
import {
  LOAD_BRANCH_DISTRIBUTORS,
  LOAD_BRANCH_DISTRIBUTORS_SUCCESS,
  LOAD_BRANCH_DISTRIBUTORS_ERROR,
  EDIT_BRANCH_DISTRIBUTORS,
  EDIT_BRANCH_DISTRIBUTORS_SUCCESS,
  EDIT_BRANCH_DISTRIBUTORS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  branchDistributors: {},
});

function branchDistributorReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BRANCH_DISTRIBUTORS:
      return state.set('loading', true).set('error', null);
    case LOAD_BRANCH_DISTRIBUTORS_SUCCESS:
      return state
        .set('loading', false)
        .set('branchDistributors', action.branchDistributors);
    case LOAD_BRANCH_DISTRIBUTORS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_BRANCH_DISTRIBUTORS:
      return state.set('loading', true).set('error', null);
    case EDIT_BRANCH_DISTRIBUTORS_SUCCESS:
      return state
        .set('loading', false)
        .set('branchDistributors', action.branchDistributors);
    case EDIT_BRANCH_DISTRIBUTORS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default branchDistributorReducer;
