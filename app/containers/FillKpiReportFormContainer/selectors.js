import { createSelector } from 'reselect';

export const selectFillKpiReportForms = (state) =>
  state.get('fillKpiReportForm');

export const makeSelectFillKpiReportLoading = () =>
  createSelector(selectFillKpiReportForms, (fillKpiReportFormState) =>
    fillKpiReportFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectFillKpiReportForms, (fillKpiReportFormState) =>
    fillKpiReportFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectFillKpiReportForms, (fillKpiReportFormState) =>
    fillKpiReportFormState.get('success'));
