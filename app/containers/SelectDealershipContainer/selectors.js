import { createSelector } from 'reselect';
import { denormalizeSelectDealerships } from './normalizr';

export const selectSelectDealerships = (state) =>
  state.get('selectDealerships');

export const makeSelectSelectDealershipsLoading = () =>
  createSelector(selectSelectDealerships, (selectDealershipState) =>
    selectDealershipState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectSelectDealerships, (selectDealershipState) =>
    selectDealershipState.get('error'));

export const makeSelectSelectDealerships = () =>
  createSelector(selectSelectDealerships, (selectDealershipState) =>
    denormalizeSelectDealerships(selectDealershipState.get('selectDealerships').toJS()));
