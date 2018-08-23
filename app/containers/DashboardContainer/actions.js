import {
  LOAD_DASHBOARD,
  LOAD_DASHBOARD_ERROR,
  LOAD_DASHBOARD_SUCCESS,
  LOAD_DASHBOARD_REAL_TIME,
  LOAD_DASHBOARD_REAL_TIME_ERROR,
  LOAD_DASHBOARD_REAL_TIME_SUCCESS,
  STOP_DASHBOARD_REAL_TIME_SUCCESS,
  STOP_DASHBOARD_REAL_TIME,
} from './constants';

// DASHBOARD LOAD

export function loadDashboard(params) {
  return {
    type: LOAD_DASHBOARD,
    params,
  };
}

export function dashboardLoaded(dashboard) {
  return {
    type: LOAD_DASHBOARD_SUCCESS,
    dashboard,
  };
}

export function loadDashboardError(error) {
  return {
    type: LOAD_DASHBOARD_ERROR,
    error,
  };
}
// END DASHBOARD LOAD

export function loadDashboardRealTime(params) {
  return {
    type: LOAD_DASHBOARD_REAL_TIME,
    params,
  };
}
export function dashboardDemandPowerLoaded(dashboard) {
  return {
    type: LOAD_DASHBOARD_REAL_TIME_SUCCESS,
    dashboard,
  };
}
export function dashboardDemandPowerError(error) {
  return {
    type: LOAD_DASHBOARD_REAL_TIME_ERROR,
    error,
  };
}

export function disconnectDashboardRealTime() {
  return {
    type: STOP_DASHBOARD_REAL_TIME,
  };
}

export function dashboardRealTimeDisconnected() {
  return {
    type: STOP_DASHBOARD_REAL_TIME_SUCCESS,
  };
}
