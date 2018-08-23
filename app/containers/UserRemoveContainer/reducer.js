import { fromJS } from 'immutable';
import {
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function userRemoveReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_USER:
      return state.set('loading', true).set('error', null);
    case REMOVE_USER_SUCCESS:
      return state.set('loading', false).set('success', {
        message: `Usuário #${action.id} removido!`,
      });
    case REMOVE_USER_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default userRemoveReducer;
