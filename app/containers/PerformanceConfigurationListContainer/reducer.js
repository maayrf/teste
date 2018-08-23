import { fromJS } from 'immutable';
import {
  LOAD_PERFORMANCE_CONFIGURATIONS,
  LOAD_PERFORMANCE_CONFIGURATIONS_SUCCESS,
  LOAD_PERFORMANCE_CONFIGURATIONS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  performanceConfigurations: {},
  totalCount: 0,
  limit: 15,
});

function performanceConfigurationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PERFORMANCE_CONFIGURATIONS:
      return state.set('loading', true).set('error', null);
    case LOAD_PERFORMANCE_CONFIGURATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('performanceConfigurations', action.performanceConfigurations)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit);
    case LOAD_PERFORMANCE_CONFIGURATIONS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default performanceConfigurationReducer;
