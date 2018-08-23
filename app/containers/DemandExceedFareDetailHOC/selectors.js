import { createSelector } from 'reselect';

export const selectDemandExceedFare = (state) => state.get('demandExceedFare');

export const makeSelectLoading = () =>
  createSelector(selectDemandExceedFare, (demandExceedFareState) =>
    demandExceedFareState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectDemandExceedFare, (demandExceedFareState) =>
    demandExceedFareState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectDemandExceedFare, (demandExceedFareState) =>
    demandExceedFareState.get('success'));
