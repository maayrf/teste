import { fromJS } from 'immutable';
import {
  LOAD_MACHINE_BY_ID,
  LOAD_MACHINE_BY_ID_ERROR,
  LOAD_MACHINE_BY_ID_SUCCESS,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function machineDetailReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOAD_MACHINE_BY_ID:
      return state
        .set('loading', true)
        .set('success', null)
        .set('error', null);
    case LOAD_MACHINE_BY_ID_ERROR:
      return state
        .set('loading', false)
        .set('success', null)
        .set('error', action.error);
    case LOAD_MACHINE_BY_ID_SUCCESS:
      return state
        .set('loading', false)
        .set('success', {
          machine: action.machine,
          message: 'Pego com sucesso!',
        })
        .set('error', null);
    default:
      return state;
  }
}

export default machineDetailReducer;
