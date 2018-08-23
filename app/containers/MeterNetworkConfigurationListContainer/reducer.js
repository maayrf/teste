import { fromJS } from 'immutable';
import {
  LOAD_METER_NETWORK_CONFIGURATIONS,
  LOAD_METER_NETWORK_CONFIGURATIONS_SUCCESS,
  LOAD_METER_NETWORK_CONFIGURATIONS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  meterNetworkConfigurations: {},
  totalCount: 0,
  limit: 15,
});

function meterNetworkConfigurationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_METER_NETWORK_CONFIGURATIONS:
      return state.set('loading', true).set('error', null);
    case LOAD_METER_NETWORK_CONFIGURATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('meterNetworkConfigurations', action.meterNetworkConfigurations)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit);
    case LOAD_METER_NETWORK_CONFIGURATIONS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default meterNetworkConfigurationReducer;
