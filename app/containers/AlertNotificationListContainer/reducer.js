import { fromJS } from 'immutable';
import {
  LOAD_ALERT_NOTIFICATIONS,
  LOAD_ALERT_NOTIFICATIONS_SUCCESS,
  LOAD_ALERT_NOTIFICATIONS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  alertNotifications: {},
});

function alertNotificationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALERT_NOTIFICATIONS:
      return state.set('loading', true).set('error', null);
    case LOAD_ALERT_NOTIFICATIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('alertNotifications', action.alertNotifications);
    case LOAD_ALERT_NOTIFICATIONS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default alertNotificationReducer;
