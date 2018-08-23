import { fromJS } from 'immutable';
import {
  LOAD_ALERT_CONFIGURATION_BY_ID,
  LOAD_ALERT_CONFIGURATION_BY_ID_ERROR,
  LOAD_ALERT_CONFIGURATION_BY_ID_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function alertConfigurationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALERT_CONFIGURATION_BY_ID:
      return state
        .set('loading', true)
        .set('success', null)
        .set('error', null);
    case LOAD_ALERT_CONFIGURATION_BY_ID_ERROR:
      return state
        .set('loading', false)
        .set('success', null)
        .set('error', action.error);
    case LOAD_ALERT_CONFIGURATION_BY_ID_SUCCESS:
      return state
        .set('loading', false)
        .set('success', {
          alertConfiguration: action.alertConfiguration,
          message: 'Pego com sucesso!',
        })
        .set('error', null);
    default:
      return state;
  }
}

export default alertConfigurationReducer;
