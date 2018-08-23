import { createSelector } from 'reselect';
import { denormalizeAutocompleteBranchess } from './normalizr';

export const selectAutocompleteBranchess = (state) =>
  state.get('autocompleteBranches');

export const makeSelectAutocompleteBranchessLoading = () =>
  createSelector(selectAutocompleteBranchess, (autocompleteBranchesState) =>
    autocompleteBranchesState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectAutocompleteBranchess, (autocompleteBranchesState) =>
    autocompleteBranchesState.get('error'));

export const makeSelectListBranches = () =>
  createSelector(selectAutocompleteBranchess, (autocompleteBranchesState) =>
    denormalizeAutocompleteBranchess(autocompleteBranchesState.get('listBranches').toJS()));
