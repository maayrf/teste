import { createSelector } from 'reselect';

export const selectBranchDetails = (state) => state.get('branchDetails');

export const makeSelectBranchDetailsLoading = () =>
  createSelector(selectBranchDetails, (branchDetailsState) =>
    branchDetailsState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectBranchDetails, (branchDetailsState) =>
    branchDetailsState.get('error'));

export const makeSelectBranchDetails = () =>
  createSelector(selectBranchDetails, (branchDetailsState) =>
    branchDetailsState.get('branchDetails').toJS());
