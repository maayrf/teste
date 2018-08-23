import { fromJS } from 'immutable';
import {
  LOAD_DASHBOARD,
  LOAD_DASHBOARD_SUCCESS,
  LOAD_DASHBOARD_ERROR,
  LOAD_DASHBOARD_REAL_TIME,
  LOAD_DASHBOARD_REAL_TIME_SUCCESS,
  LOAD_DASHBOARD_REAL_TIME_ERROR,
  STOP_DASHBOARD_REAL_TIME_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  dashboard: {},
  socketOn: false,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DASHBOARD:
      return state.set('loading', true).set('error', null);
    case LOAD_DASHBOARD_SUCCESS:
      return state.set('loading', false).set('dashboard', action.dashboard);
    case LOAD_DASHBOARD_ERROR:
      return state.set('loading', false).set('error', action.error);
    case LOAD_DASHBOARD_REAL_TIME:
      return state.set('error', null);
    case LOAD_DASHBOARD_REAL_TIME_SUCCESS:
      const dashboard = state.get('dashboard').toJS();
      return state
        .set('dashboard', fromJS({ ...dashboard, ...action.dashboard }))
        .set('socketOn', true);
    case STOP_DASHBOARD_REAL_TIME_SUCCESS:
      return state.set('socketOn', false);
    case LOAD_DASHBOARD_REAL_TIME_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default dashboardReducer;
