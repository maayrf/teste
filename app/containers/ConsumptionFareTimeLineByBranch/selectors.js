import { createSelector } from 'reselect';

export const selectConsumptionFares = (state) => state.get('consumptionFares');

export const makeSelectConsumptionFaresLoading = () =>
  createSelector(selectConsumptionFares, (consumptionFareState) =>
    consumptionFareState.get('loading'));

export const makeSelectConsumptionFaresError = () =>
  createSelector(selectConsumptionFares, (consumptionFareState) =>
    consumptionFareState.get('error'));

export const makeSelectConsumptionFares = () =>
  createSelector(selectConsumptionFares, (consumptionFareState) =>
    consumptionFareState.get('consumptionFares').toJS());

export const makeSelectLimit = () =>
  createSelector(selectConsumptionFares, (consumptionFareState) =>
    consumptionFareState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectConsumptionFares, (consumptionFareState) =>
    consumptionFareState.get('totalCount'));
