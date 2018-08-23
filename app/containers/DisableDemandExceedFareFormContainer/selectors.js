import { createSelector } from 'reselect';

export const selectDisableDemandExceedFareForms = (state) =>
  state.get('disableDemandExceedFareForm');

export const makeSelectDisableDemandExceedFareLoading = () =>
  createSelector(
    selectDisableDemandExceedFareForms,
    (disableDemandExceedFareFormState) =>
      disableDemandExceedFareFormState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectDisableDemandExceedFareForms,
    (disableDemandExceedFareFormState) =>
      disableDemandExceedFareFormState.get('error')
  );

export const makeSelectSuccess = () =>
  createSelector(
    selectDisableDemandExceedFareForms,
    (disableDemandExceedFareFormState) =>
      disableDemandExceedFareFormState.get('success')
  );
