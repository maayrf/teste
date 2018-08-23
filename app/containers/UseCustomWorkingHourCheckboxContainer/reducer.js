import { fromJS } from 'immutable';
import {
  EDIT_EGG_CUSTOM_WORKING_HOUR_SUCCESS,
  EDIT_EGG_CUSTOM_WORKING_HOUR,
  EDIT_EGG_CUSTOM_WORKING_HOUR_ERROR,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function eggFormReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case EDIT_EGG_CUSTOM_WORKING_HOUR:
      return state.set('loading', true).set('error', null);
    case EDIT_EGG_CUSTOM_WORKING_HOUR_SUCCESS:
      return state
        .set('success', {
          egg: action.egg,
          message: `Egg ${action.egg.id} editado com sucesso!`,
        })
        .set('loading', false);
    case EDIT_EGG_CUSTOM_WORKING_HOUR_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default eggFormReducer;
