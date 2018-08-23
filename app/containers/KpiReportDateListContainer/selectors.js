import { createSelector } from 'reselect';
import { denormalizeKpiReportDates } from './normalizr';

export const selectKpiReportDates = (state) => state.get('kpiReportDates');

export const makeSelectKpiReportDatesLoading = () =>
  createSelector(selectKpiReportDates, (kpiReportDateState) =>
    kpiReportDateState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectKpiReportDates, (kpiReportDateState) =>
    kpiReportDateState.get('error'));

export const makeSelectKpiReportDates = () =>
  createSelector(selectKpiReportDates, (kpiReportDateState) =>
    denormalizeKpiReportDates(kpiReportDateState.get('kpiReportDates').toJS()));

export const makeSelectLimit = () =>
  createSelector(selectKpiReportDates, (kpiReportDateState) =>
    kpiReportDateState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectKpiReportDates, (kpiReportDateState) =>
    kpiReportDateState.get('totalCount'));
