import { fromJS } from 'immutable';
import {
  LOAD_ALERT_CONFIGURATIONS,
  LOAD_ALERT_CONFIGURATIONS_SUCCESS,
  LOAD_ALERT_CONFIGURATIONS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  alertConfigurations: {},
  totalCount: 0,
  limit: 15,
  offset: null,
});

function alertConfigurationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALERT_CONFIGURATIONS:
      return state.set('loading', true).set('error', null);
    case LOAD_ALERT_CONFIGURATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('alertConfigurations', action.alertConfigurations)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit)
        .set('offset', action.offset);
    case LOAD_ALERT_CONFIGURATIONS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default alertConfigurationReducer;
