import { fromJS } from 'immutable';
import {
  REMOVE_CONSUMPTION_FARE,
  REMOVE_CONSUMPTION_FARE_SUCCESS,
  REMOVE_CONSUMPTION_FARE_ERROR,
  CREATE_CONSUMPTION_FARE,
  CREATE_CONSUMPTION_FARE_SUCCESS,
  CREATE_CONSUMPTION_FARE_ERROR,
  EDIT_CONSUMPTION_FARE_SUCCESS,
  EDIT_CONSUMPTION_FARE,
  EDIT_CONSUMPTION_FARE_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function consumptionFareFormReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_CONSUMPTION_FARE:
      return state.set('loading', true).set('error', null);
    case REMOVE_CONSUMPTION_FARE_SUCCESS:
      return state.set('loading', false);
    case REMOVE_CONSUMPTION_FARE_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_CONSUMPTION_FARE:
      return state.set('loading', true).set('error', null);
    case CREATE_CONSUMPTION_FARE_SUCCESS:
      return state
        .set('success', {
          consumptionFare: action.consumptionFare,
          message: `Tarifa de Consumo ${
            action.consumptionFare.id
          } criada com sucesso!`,
        })
        .set('loading', false);
    case CREATE_CONSUMPTION_FARE_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_CONSUMPTION_FARE:
      return state.set('loading', true).set('error', null);
    case EDIT_CONSUMPTION_FARE_SUCCESS:
      return state
        .set('success', {
          consumptionFare: action.consumptionFare,
          message: `Tarifa de Consumo ${
            action.consumptionFare.id
          } editada com sucesso!`,
        })
        .set('loading', false);
    case EDIT_CONSUMPTION_FARE_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default consumptionFareFormReducer;
