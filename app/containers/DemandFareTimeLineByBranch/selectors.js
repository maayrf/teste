import { createSelector } from 'reselect';

export const selectDemandFares = (state) => state.get('demandFares');

export const makeSelectDemandFaresLoading = () =>
  createSelector(selectDemandFares, (demandFaresState) =>
    demandFaresState.get('loading'));

export const makeSelectDemandFaresError = () =>
  createSelector(selectDemandFares, (demandFaresState) =>
    demandFaresState.get('error'));

export const makeSelectDemandFares = () =>
  createSelector(selectDemandFares, (demandFaresState) =>
    demandFaresState.get('demandFares').toJS());

export const makeSelectLimit = () =>
  createSelector(selectDemandFares, (demandFaresState) =>
    demandFaresState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectDemandFares, (demandFaresState) =>
    demandFaresState.get('totalCount'));
