import { fromJS } from 'immutable';
import {
  LOAD_BRANCH_DETAILS,
  LOAD_BRANCH_DETAILS_SUCCESS,
  LOAD_BRANCH_DETAILS_ERROR,
  REMOVE_BRANCH_DETAILS,
  REMOVE_BRANCH_DETAILS_SUCCESS,
  REMOVE_BRANCH_DETAILS_ERROR,
  CREATE_BRANCH_DETAILS,
  CREATE_BRANCH_DETAILS_SUCCESS,
  CREATE_BRANCH_DETAILS_ERROR,
  EDIT_BRANCH_DETAILS_SUCCESS,
  EDIT_BRANCH_DETAILS,
  EDIT_BRANCH_DETAILS_ERROR,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  branchDetails: {},
});

function branchDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOAD_BRANCH_DETAILS:
      return state.set('loading', true).set('error', null);
    case LOAD_BRANCH_DETAILS_SUCCESS:
      return state
        .set('loading', false)
        .set('branchDetails', action.branchDetails);
    case LOAD_BRANCH_DETAILS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case REMOVE_BRANCH_DETAILS:
      return state.set('loading', true).set('error', null);
    case REMOVE_BRANCH_DETAILS_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['branchDetails', action.id.toString()]);
    case REMOVE_BRANCH_DETAILS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_BRANCH_DETAILS:
      return state.set('loading', true).set('error', null);
    case CREATE_BRANCH_DETAILS_SUCCESS:
      return state.set('loading', false).mergeDeep({
        branchDetails: {
          [action.branchDetails.id.toString()]: action.branchDetails,
        },
      });
    case CREATE_BRANCH_DETAILS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_BRANCH_DETAILS:
      return state.set('loading', true).set('error', null);
    case EDIT_BRANCH_DETAILS_SUCCESS:
      return state.set('loading', false).mergeDeep({
        branchDetails: {
          [action.branchDetails.id.toString()]: action.branchDetails,
        },
      });
    case EDIT_BRANCH_DETAILS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default branchDetailsReducer;
