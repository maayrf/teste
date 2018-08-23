import { fromJS } from 'immutable';
import {
  CREATE_WORKING_HOURS,
  CREATE_WORKING_HOURS_SUCCESS,
  CREATE_WORKING_HOURS_ERROR,
  EDIT_WORKING_HOURS_SUCCESS,
  EDIT_WORKING_HOURS,
  EDIT_WORKING_HOURS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function workingHoursFormReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_WORKING_HOURS:
      return state.set('loading', true).set('error', null);
    case CREATE_WORKING_HOURS_SUCCESS:
      return state
        .set('success', {
          workingHours: action.workingHours,
          message: 'Quadro de horário criado com sucesso!',
        })
        .set('loading', false);
    case CREATE_WORKING_HOURS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_WORKING_HOURS:
      return state.set('loading', true).set('error', null);
    case EDIT_WORKING_HOURS_SUCCESS:
      return state
        .set('success', {
          workingHours: action.workingHours,
          message: 'Quadro de horário editado com sucesso!',
        })
        .set('loading', false);
    case EDIT_WORKING_HOURS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default workingHoursFormReducer;
