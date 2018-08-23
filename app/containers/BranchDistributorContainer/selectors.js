import { createSelector } from 'reselect';

export const selectBranchDistributors = (state) =>
  state.get('branchDistributors');

export const makeSelectBranchDistributorsLoading = () =>
  createSelector(selectBranchDistributors, (branchDistributorState) =>
    branchDistributorState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectBranchDistributors, (branchDistributorState) =>
    branchDistributorState.get('error'));

export const makeSelectBranchDistributors = () =>
  createSelector(selectBranchDistributors, (branchDistributorState) =>
    branchDistributorState.get('branchDistributors').toJS());
