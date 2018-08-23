import { fromJS } from 'immutable';
import {
  REMOVE_GROUPING,
  REMOVE_GROUPING_SUCCESS,
  REMOVE_GROUPING_ERROR,
  CREATE_GROUPING,
  CREATE_GROUPING_SUCCESS,
  CREATE_GROUPING_ERROR,
  EDIT_GROUPING_SUCCESS,
  EDIT_GROUPING,
  EDIT_GROUPING_ERROR,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function groupingFormReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case REMOVE_GROUPING:
      return state.set('loading', true).set('error', null);
    case REMOVE_GROUPING_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['grouping', action.id.toString()]);
    case REMOVE_GROUPING_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_GROUPING:
      return state.set('loading', true).set('error', null);
    case CREATE_GROUPING_SUCCESS:
      return state
        .set('success', {
          grouping: action.grouping,
          message: `Grupo ${action.grouping.id} criado com sucesso!`,
        })
        .set('loading', false);
    case CREATE_GROUPING_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_GROUPING:
      return state.set('loading', true).set('error', null);
    case EDIT_GROUPING_SUCCESS:
      return state
        .set('success', {
          grouping: action.grouping,
          message: `Grupo ${action.grouping.id} editado com sucesso!`,
        })
        .set('loading', false);
    case EDIT_GROUPING_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default groupingFormReducer;
