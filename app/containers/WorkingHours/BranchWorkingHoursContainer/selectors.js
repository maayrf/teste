import { createSelector } from 'reselect';

export const selectBranchWorkingHoursContainer = (state) =>
  state.get('branchWorkingHours');

export const makeSelectLimit = () =>
  createSelector(
    selectBranchWorkingHoursContainer,
    (branchWorkingHoursContainerState) =>
      branchWorkingHoursContainerState.get('limit')
  );

export const makeSelectTotalCount = () =>
  createSelector(
    selectBranchWorkingHoursContainer,
    (branchWorkingHoursContainerState) =>
      branchWorkingHoursContainerState.get('totalCount')
  );

export const makeSelectWorkingHoursContainerLoading = () =>
  createSelector(
    selectBranchWorkingHoursContainer,
    (branchWorkingHoursContainerState) =>
      branchWorkingHoursContainerState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectBranchWorkingHoursContainer,
    (branchWorkingHoursContainerState) =>
      branchWorkingHoursContainerState.get('error')
  );

export const makeSelectWorkingHours = () =>
  createSelector(
    selectBranchWorkingHoursContainer,
    (branchWorkingHoursContainerState) =>
      branchWorkingHoursContainerState.get('workingHours').toJS()
  );
