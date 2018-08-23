import { createSelector } from 'reselect';
import { denormalizeReports } from './normalizr';

export const selectReport = (state) => state.get('report');

export const makeSelectReportLoading = () =>
  createSelector(selectReport, (reportState) => reportState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectReport, (reportState) => reportState.get('error'));
