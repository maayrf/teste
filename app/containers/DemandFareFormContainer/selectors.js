import { createSelector } from 'reselect';

export const selectDemandFareForms = (state) => state.get('demandFareForm');

export const makeSelectDemandFareLoading = () =>
  createSelector(selectDemandFareForms, (demandExceedFareFormState) =>
    demandExceedFareFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectDemandFareForms, (demandExceedFareFormState) =>
    demandExceedFareFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectDemandFareForms, (demandExceedFareFormState) =>
    demandExceedFareFormState.get('success'));
