import { fromJS } from 'immutable';
import {
  LOAD_AUTOCOMPLETE_BRANCHES,
  LOAD_AUTOCOMPLETE_BRANCHES_SUCCESS,
  LOAD_AUTOCOMPLETE_BRANCHES_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  listBranches: {},
});

function autocompleteBranchesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_AUTOCOMPLETE_BRANCHES:
      return state.set('loading', true).set('error', null);
    case LOAD_AUTOCOMPLETE_BRANCHES_SUCCESS:
      return state
        .set('loading', false)
        .set('listBranches', action.listBranches);
    case LOAD_AUTOCOMPLETE_BRANCHES_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default autocompleteBranchesReducer;
