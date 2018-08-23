import { createSelector } from 'reselect';

export const selectApportionments = (state) => state.get('apportionments');

export const makeSelectApportionments = () =>
  createSelector(selectApportionments, (apportionmentsState) =>
    apportionmentsState.get('apportionments').toJS());

export const makeSelectApportionmentsLoading = () =>
  createSelector(selectApportionments, (apportionmentsState) =>
    apportionmentsState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectApportionments, (apportionmentsState) =>
    apportionmentsState.get('error'));

export const makeSelectApportionmentsFareAndWorkingHoursErrors = () =>
  createSelector(selectApportionments, (apportionmentsState) =>
    apportionmentsState.get('apportionmentsFareAndWorkingHoursErrors').toJS());
