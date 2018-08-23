import { fromJS } from 'immutable';
import {
  REMOVE_MACHINE,
  REMOVE_MACHINE_SUCCESS,
  REMOVE_MACHINE_ERROR,
  CREATE_MACHINE,
  CREATE_MACHINE_SUCCESS,
  CREATE_MACHINE_ERROR,
  EDIT_MACHINE_SUCCESS,
  EDIT_MACHINE,
  EDIT_MACHINE_ERROR,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function machineFormReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case REMOVE_MACHINE:
      return state.set('loading', true).set('error', null);
    case REMOVE_MACHINE_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['machine', action.id.toString()]);
    case REMOVE_MACHINE_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_MACHINE:
      return state.set('loading', true).set('error', null);
    case CREATE_MACHINE_SUCCESS:
      return state
        .set('success', {
          machine: action.machine,
          message: `Machine ${action.machine.id} criado com sucesso!`,
        })
        .set('loading', false);
    case CREATE_MACHINE_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_MACHINE:
      return state.set('loading', true).set('error', null);
    case EDIT_MACHINE_SUCCESS:
      return state
        .set('success', {
          machine: action.machine,
          message: `Machine ${action.machine.id} editado com sucesso!`,
        })
        .set('loading', false);
    case EDIT_MACHINE_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default machineFormReducer;
