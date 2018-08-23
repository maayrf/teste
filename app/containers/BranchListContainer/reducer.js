import { fromJS } from 'immutable';
import {
  LOAD_BRANCHES,
  LOAD_BRANCHES_SUCCESS,
  LOAD_BRANCHES_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  branches: {},
  totalCount: 0,
  limit: 15,
});

function branchesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BRANCHES:
      return state.set('loading', true).set('error', null);
    case LOAD_BRANCHES_SUCCESS:
      return state
        .set('loading', false)
        .set('branches', action.branches)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit);
    case LOAD_BRANCHES_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default branchesReducer;
