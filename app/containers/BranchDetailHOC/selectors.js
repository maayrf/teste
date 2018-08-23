import { createSelector } from 'reselect';

export const selectBranch = (reducerKey = 'branch') => (state) =>
  state.get(reducerKey);

export const makeSelectLoading = (reducerKey = 'branch') =>
  createSelector(selectBranch(reducerKey), (branchState) =>
    branchState.get('loading'));

export const makeSelectError = (reducerKey = 'branch') =>
  createSelector(selectBranch(reducerKey), (branchState) =>
    branchState.get('error'));

export const makeSelectSuccess = (reducerKey = 'branch') =>
  createSelector(selectBranch(reducerKey), (branchState) =>
    branchState.get('success'));
