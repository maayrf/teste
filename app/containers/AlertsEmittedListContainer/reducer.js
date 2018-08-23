import { fromJS } from 'immutable';
import {
  LOAD_ALERTS_EMITTED,
  LOAD_ALERTS_EMITTED_SUCCESS,
  LOAD_ALERTS_EMITTED_ERROR,
  CHANGE_ALERTS_EMITTED_STATUS,
  CHANGE_ALERTS_EMITTED_STATUS_SUCCESS,
  CHANGE_ALERTS_EMITTED_STATUS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  alertsEmitted: {},
  totalCount: 0,
  limit: 15,
  offset: null,
});

function alertsEmittedReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ALERTS_EMITTED_STATUS:
      return state.set('loading', true).set('error', null);
    case CHANGE_ALERTS_EMITTED_STATUS_SUCCESS:
      return state.set('loading', false);
    case CHANGE_ALERTS_EMITTED_STATUS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case LOAD_ALERTS_EMITTED:
      return state.set('loading', true).set('error', null);
    case LOAD_ALERTS_EMITTED_SUCCESS:
      return state
        .set('loading', false)
        .set('alertsEmitted', action.alertsEmitted)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit)
        .set('offset', action.offset);
    case LOAD_ALERTS_EMITTED_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default alertsEmittedReducer;
