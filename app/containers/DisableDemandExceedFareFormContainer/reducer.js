import { fromJS } from 'immutable';
import {
  EDIT_DISABLE_DEMAND_EXCEED_FARE_SUCCESS,
  EDIT_DISABLE_DEMAND_EXCEED_FARE,
  EDIT_DISABLE_DEMAND_EXCEED_FARE_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function disableDemandExceedFareFormReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_DISABLE_DEMAND_EXCEED_FARE:
      return state.set('loading', true).set('error', null);
    case EDIT_DISABLE_DEMAND_EXCEED_FARE_SUCCESS:
      return state
        .set('success', {
          disableDemandExceedFare: action.disableDemandExceedFare,
          message: `Tarifa de Ultrapassagem de Demanda #${
            action.disableDemandExceedFare.id
          } desabilitada com sucesso!`,
        })
        .set('loading', false);
    case EDIT_DISABLE_DEMAND_EXCEED_FARE_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default disableDemandExceedFareFormReducer;
