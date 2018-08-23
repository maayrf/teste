import { fromJS } from 'immutable';
import {
  REMOVE_METER_NETWORK,
  REMOVE_METER_NETWORK_SUCCESS,
  REMOVE_METER_NETWORK_ERROR,
  CREATE_METER_NETWORK,
  CREATE_METER_NETWORK_SUCCESS,
  CREATE_METER_NETWORK_ERROR,
  EDIT_METER_NETWORK_SUCCESS,
  EDIT_METER_NETWORK,
  EDIT_METER_NETWORK_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function meterNetworkFormReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_METER_NETWORK:
      return state.set('loading', true).set('error', null);
    case REMOVE_METER_NETWORK_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['meterNetwork', action.id.toString()]);
    case REMOVE_METER_NETWORK_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_METER_NETWORK:
      return state.set('loading', true).set('error', null);
    case CREATE_METER_NETWORK_SUCCESS:
      return state
        .set('success', {
          meterNetwork: action.meterNetwork,
          message: `Configuração de rede #${
            action.meterNetwork.id
          } criado com sucesso!`,
        })
        .set('loading', false);
    case CREATE_METER_NETWORK_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_METER_NETWORK:
      return state.set('loading', true).set('error', null);
    case EDIT_METER_NETWORK_SUCCESS:
      return state
        .set('success', {
          meterNetwork: action.meterNetwork,
          message: `Configuração de rede #${
            action.meterNetwork.id
          } editado com sucesso!`,
        })
        .set('loading', false);
    case EDIT_METER_NETWORK_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default meterNetworkFormReducer;
