import { createSelector } from 'reselect';

export const selectFares = (state) => state.get('branchFares');

export const makeSelectFaresLoading = () =>
  createSelector(selectFares, (branchFaresState) =>
    branchFaresState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectFares, (branchFaresState) =>
    branchFaresState.get('error'));

export const makeSelectConsumptionFare = () =>
  createSelector(selectFares, (branchFaresState) =>
    branchFaresState.get('consumptionFare'));

export const makeSelectDemandFare = () =>
  createSelector(selectFares, (branchFaresState) =>
    branchFaresState.get('demandFare'));

export const makeSelectDemandExceedFare = () =>
  createSelector(selectFares, (branchFaresState) =>
    branchFaresState.get('demandExceedFare'));
