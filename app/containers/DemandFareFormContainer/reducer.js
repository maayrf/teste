import { fromJS } from 'immutable';
import {
  REMOVE_DEMAND_FARE,
  REMOVE_DEMAND_FARE_SUCCESS,
  REMOVE_DEMAND_FARE_ERROR,
  CREATE_DEMAND_FARE,
  CREATE_DEMAND_FARE_SUCCESS,
  CREATE_DEMAND_FARE_ERROR,
  EDIT_DEMAND_FARE_SUCCESS,
  EDIT_DEMAND_FARE,
  EDIT_DEMAND_FARE_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function demandExceedFareFormReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_DEMAND_FARE:
      return state.set('loading', true).set('error', null);
    case REMOVE_DEMAND_FARE_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['demandExceedFare', action.id.toString()]);
    case REMOVE_DEMAND_FARE_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_DEMAND_FARE:
      return state.set('loading', true).set('error', null);
    case CREATE_DEMAND_FARE_SUCCESS:
      return state
        .set('success', {
          demandExceedFare: action.demandFare,
          message: `Tarifa de demanda contratada ${
            action.demandFare.id
          } criada com sucesso!`,
        })
        .set('loading', false);
    case CREATE_DEMAND_FARE_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_DEMAND_FARE:
      return state.set('loading', true).set('error', null);
    case EDIT_DEMAND_FARE_SUCCESS:
      return state
        .set('success', {
          demandExceedFare: action.demandFare,
          message: `Tarifa de demanda contratada ${
            action.demandFare.id
          } editado com sucesso!`,
        })
        .set('loading', false);
    case EDIT_DEMAND_FARE_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default demandExceedFareFormReducer;
