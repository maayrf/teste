import { fromJS } from 'immutable';
import {
  LOAD_USER_MAIL_AUTO_COMPLETES,
  LOAD_USER_MAIL_AUTO_COMPLETES_SUCCESS,
  LOAD_USER_MAIL_AUTO_COMPLETES_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  users: {},
});

function userMailAutoCompleteReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_MAIL_AUTO_COMPLETES:
      return state.set('loading', true).set('error', null);
    case LOAD_USER_MAIL_AUTO_COMPLETES_SUCCESS:
      return state.set('loading', false).set('users', action.users);
    case LOAD_USER_MAIL_AUTO_COMPLETES_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default userMailAutoCompleteReducer;
