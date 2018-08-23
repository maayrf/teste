import { createSelector } from 'reselect';

export const selectDashboards = (state) => state.get('dashboard');

export const makeSelectDashboardLoading = () =>
  createSelector(selectDashboards, (dashboardState) =>
    dashboardState.get('loading'));

export const makeSelectSocketOn = () =>
  createSelector(selectDashboards, (dashboardState) =>
    dashboardState.get('socketOn'));

export const makeSelectError = () =>
  createSelector(selectDashboards, (dashboardState) =>
    dashboardState.get('error'));

export const makeSelectDashboard = () =>
  createSelector(selectDashboards, (dashboardState) =>
    dashboardState.get('dashboard').toJS());
