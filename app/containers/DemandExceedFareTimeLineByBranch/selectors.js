import { createSelector } from 'reselect';
import { denormalizeDemandExceedFares } from './normalizr';

export const selectDemandExceedFares = (state) =>
  state.get('demandExceedFares');

export const makeSelectDemandExceedFaresLoading = () =>
  createSelector(selectDemandExceedFares, (demandExceedFaresState) =>
    demandExceedFaresState.get('loading'));

export const makeSelectDemandExceedFaresError = () =>
  createSelector(selectDemandExceedFares, (demandExceedFaresState) =>
    demandExceedFaresState.get('error'));

export const makeSelectDemandExceedFares = () =>
  createSelector(selectDemandExceedFares, (demandExceedFaresState) =>
    demandExceedFaresState.get('demandExceedFares').toJS());

export const makeSelectLimit = () =>
  createSelector(selectDemandExceedFares, (demandExceedFaresState) =>
    demandExceedFaresState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectDemandExceedFares, (demandExceedFaresState) =>
    demandExceedFaresState.get('totalCount'));
