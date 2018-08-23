import { fromJS } from 'immutable';
import {
  LOAD_BRANCH_BY_ID,
  LOAD_BRANCH_BY_ID_ERROR,
  LOAD_BRANCH_BY_ID_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function branchReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BRANCH_BY_ID:
      return state
        .set('loading', true)
        .set('success', null)
        .set('error', null);
    case LOAD_BRANCH_BY_ID_ERROR:
      return state
        .set('loading', false)
        .set('success', null)
        .set('error', action.error);
    case LOAD_BRANCH_BY_ID_SUCCESS:
      return state
        .set('loading', false)
        .set('success', {
          branch: action.branch,
          message: 'Pego com sucesso!',
        })
        .set('error', null);
    default:
      return state;
  }
}

export default branchReducer;
