import { fromJS } from 'immutable';
import {
  DELETE_WORKING_HOURS,
  DELETE_WORKING_HOURS_SUCCESS,
  DELETE_WORKING_HOURS_ERROR,
} from './constants';

const initialState = fromJS({
  loadingDelete: false,
  errorDelete: {},
  successDelete: {},
});

function deleteWorkingHoursReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_WORKING_HOURS:
      return state
        .set('loadingDelete', true)
        .set('successDelete', {})
        .set('errorDelete', {});
    case DELETE_WORKING_HOURS_SUCCESS:
      return state
        .set('loadingDelete', false)
        .set('successDelete', {
          message: 'Sucesso',
          description: 'Quadro de horário deletado com sucesso!',
        })
        .set('errorDelete', null);
    case DELETE_WORKING_HOURS_ERROR:
      return state
        .set('loadingDelete', false)
        .set('successDelete', {})
        .set('errorDelete', {
          message: 'Erro',
          description: 'Erro ao deletar quadro de horário.',
        });
    default:
      return state;
  }
}

export default deleteWorkingHoursReducer;
