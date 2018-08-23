import { createSelector } from 'reselect';

export const selectDemandFare = (state) => state.get('demandFare');

export const makeSelectLoading = () =>
  createSelector(selectDemandFare, (demandFareState) =>
    demandFareState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectDemandFare, (demandFareState) =>
    demandFareState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectDemandFare, (demandFareState) =>
    demandFareState.get('success'));
