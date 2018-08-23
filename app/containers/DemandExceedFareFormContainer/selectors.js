import { createSelector } from 'reselect';

export const selectDemandExceedFareForms = (state) =>
  state.get('demandExceedFareForm');

export const makeSelectDemandExceedFareLoading = () =>
  createSelector(selectDemandExceedFareForms, (demandExceedFareFormState) =>
    demandExceedFareFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectDemandExceedFareForms, (demandExceedFareFormState) =>
    demandExceedFareFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectDemandExceedFareForms, (demandExceedFareFormState) =>
    demandExceedFareFormState.get('success'));
