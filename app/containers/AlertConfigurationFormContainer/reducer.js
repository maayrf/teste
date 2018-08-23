import { fromJS } from 'immutable';
import {
  REMOVE_ALERT_CONFIGURATION,
  REMOVE_ALERT_CONFIGURATION_SUCCESS,
  REMOVE_ALERT_CONFIGURATION_ERROR,
  CREATE_ALERT_CONFIGURATION,
  CREATE_ALERT_CONFIGURATION_SUCCESS,
  CREATE_ALERT_CONFIGURATION_ERROR,
  EDIT_ALERT_CONFIGURATION_SUCCESS,
  EDIT_ALERT_CONFIGURATION,
  EDIT_ALERT_CONFIGURATION_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function alertConfigurationFormReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_ALERT_CONFIGURATION:
      return state.set('loading', true).set('error', null);
    case REMOVE_ALERT_CONFIGURATION_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['alertConfiguration', action.id.toString()]);
    case REMOVE_ALERT_CONFIGURATION_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_ALERT_CONFIGURATION:
      return state.set('loading', true).set('error', null);
    case CREATE_ALERT_CONFIGURATION_SUCCESS:
      return state
        .set('success', {
          alertConfiguration: action.alertConfiguration,
          message: `Configuração de Alerta ${
            action.alertConfiguration.id
          } criado com sucesso!`,
        })
        .set('loading', false);
    case CREATE_ALERT_CONFIGURATION_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_ALERT_CONFIGURATION:
      return state.set('loading', true).set('error', null);
    case EDIT_ALERT_CONFIGURATION_SUCCESS:
      return state
        .set('success', {
          alertConfiguration: action.alertConfiguration,
          message: `AlertConfiguration ${
            action.alertConfiguration.id
          } editado com sucesso!`,
        })
        .set('loading', false);
    case EDIT_ALERT_CONFIGURATION_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default alertConfigurationFormReducer;
