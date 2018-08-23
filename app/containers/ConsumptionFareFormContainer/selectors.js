import { createSelector } from 'reselect';

export const selectConsumptionFareForms = (state) =>
  state.get('consumptionFareForm');

export const makeSelectConsumptionFareLoading = () =>
  createSelector(selectConsumptionFareForms, (consumptionFareFormState) =>
    consumptionFareFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectConsumptionFareForms, (consumptionFareFormState) =>
    consumptionFareFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectConsumptionFareForms, (consumptionFareFormState) =>
    consumptionFareFormState.get('success'));
