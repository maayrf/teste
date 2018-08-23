import { createSelector } from 'reselect';

export const selectConsumptionFare = (state) => state.get('consumptionFare');

export const makeSelectLoading = () =>
  createSelector(selectConsumptionFare, (consumptionFareState) =>
    consumptionFareState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectConsumptionFare, (consumptionFareState) =>
    consumptionFareState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectConsumptionFare, (consumptionFareState) =>
    consumptionFareState.get('success'));
