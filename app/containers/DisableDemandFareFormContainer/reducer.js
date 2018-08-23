import { fromJS } from 'immutable';
import {
  EDIT_DISABLE_DEMAND_FARE_SUCCESS,
  EDIT_DISABLE_DEMAND_FARE,
  EDIT_DISABLE_DEMAND_FARE_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function disableDemandFareFormReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_DISABLE_DEMAND_FARE:
      return state.set('loading', true).set('error', null);
    case EDIT_DISABLE_DEMAND_FARE_SUCCESS:
      return state
        .set('success', {
          disableDemandFare: action.disableDemandFare,
          message: `Tarifa de Demanda Contratada #${
            action.disableDemandFare.id
          } desabilitada com sucesso!`,
        })
        .set('loading', false);
    case EDIT_DISABLE_DEMAND_FARE_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default disableDemandFareFormReducer;
