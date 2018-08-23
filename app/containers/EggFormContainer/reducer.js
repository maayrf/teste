import { fromJS } from 'immutable';
import {
  REMOVE_EGG,
  REMOVE_EGG_SUCCESS,
  REMOVE_EGG_ERROR,
  CREATE_EGG,
  CREATE_EGG_SUCCESS,
  CREATE_EGG_ERROR,
  EDIT_EGG_SUCCESS,
  EDIT_EGG,
  EDIT_EGG_ERROR,
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
    case REMOVE_EGG:
      return state.set('loading', true).set('error', null);
    case REMOVE_EGG_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['egg', action.id.toString()]);
    case REMOVE_EGG_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_EGG:
      return state.set('loading', true).set('error', null);
    case CREATE_EGG_SUCCESS:
      return state
        .set('success', {
          egg: action.egg,
          message: `Egg ${action.egg.id} criado com sucesso!`,
        })
        .set('loading', false);
    case CREATE_EGG_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_EGG:
      return state.set('loading', true).set('error', null);
    case EDIT_EGG_SUCCESS:
      return state
        .set('success', {
          egg: action.egg,
          message: `Egg ${action.egg.id} editado com sucesso!`,
        })
        .set('loading', false);
    case EDIT_EGG_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default eggFormReducer;
