import { createSelector } from 'reselect';
import { denormalizeReports } from './normalizr';

export const selectReports = (state) => state.get('reports');

export const makeSelectReportsLoading = () =>
  createSelector(selectReports, (reportState) => reportState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectReports, (reportState) => reportState.get('error'));

export const makeSelectReports = () =>
  createSelector(selectReports, (reportState) =>
    denormalizeReports(reportState.get('reports').toJS()));

export const makeSelectTotalCount = () =>
  createSelector(selectReports, (reportState) => reportState.get('totalCount'));

export const makeSelectOffset = () =>
  createSelector(selectReports, (reportState) => reportState.get('offset'));

export const makeSelectLimit = () =>
  createSelector(selectReports, (reportState) => reportState.get('limit'));
