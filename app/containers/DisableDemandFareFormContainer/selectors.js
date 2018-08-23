import { createSelector } from 'reselect';

export const selectDisableDemandFareForms = (state) =>
  state.get('disableDemandFareForm');

export const makeSelectDisableDemandFareLoading = () =>
  createSelector(selectDisableDemandFareForms, (disableDemandFareFormState) =>
    disableDemandFareFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectDisableDemandFareForms, (disableDemandFareFormState) =>
    disableDemandFareFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectDisableDemandFareForms, (disableDemandFareFormState) =>
    disableDemandFareFormState.get('success'));
