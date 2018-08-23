import { fromJS } from 'immutable';
import {
  REMOVE_ALERT_CONFIGURATION,
  REMOVE_ALERT_CONFIGURATION_ERROR,
  REMOVE_ALERT_CONFIGURATION_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function removeAlertConfigurationButtonReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_ALERT_CONFIGURATION:
      return state.set('loading', true).set('error', null);
    case REMOVE_ALERT_CONFIGURATION_ERROR:
      return state.set('loading', false).set('error', action.error);
    case REMOVE_ALERT_CONFIGURATION_SUCCESS:
      return state.set('loading', false).set('success', {
        message: `${action.id} foi deletado com sucesso!`,
      });
    default:
      return state;
  }
}

export default removeAlertConfigurationButtonReducer;
