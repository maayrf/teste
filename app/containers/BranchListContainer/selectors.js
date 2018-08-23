import { createSelector } from 'reselect';
import { denormalizeBranches } from './normalizr';

export const selectBranches = (reducerKey = 'branches') => (state) =>
  state.get(reducerKey);

export const makeSelectBranchesLoading = (reducerKey = 'branches') =>
  createSelector(selectBranches(reducerKey), (branchState) =>
    branchState.get('loading'));

export const makeSelectError = (reducerKey = 'branches') =>
  createSelector(selectBranches(reducerKey), (branchState) =>
    branchState.get('error'));

export const makeSelectBranches = (reducerKey = 'branches') =>
  createSelector(selectBranches(reducerKey), (branchState) =>
    denormalizeBranches(branchState.get('branches').toJS()));

export const makeSelectLimit = (reducerKey = 'branches') =>
  createSelector(selectBranches(reducerKey), (branchState) =>
    branchState.get('limit'));

export const makeSelectTotalCount = (reducerKey = 'branches') =>
  createSelector(selectBranches(reducerKey), (branchState) =>
    branchState.get('totalCount'));
