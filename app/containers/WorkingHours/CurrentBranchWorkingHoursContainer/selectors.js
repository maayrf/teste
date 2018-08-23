import { createSelector } from 'reselect';

export const selectCurrentBranchWorkingHoursContainer = (state) =>
  state.get('currentBranchWorkingHours');

export const makeSelectLoading = () =>
  createSelector(
    selectCurrentBranchWorkingHoursContainer,
    (currentBranchWorkingHoursContainerState) =>
      currentBranchWorkingHoursContainerState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectCurrentBranchWorkingHoursContainer,
    (currentBranchWorkingHoursContainerState) =>
      currentBranchWorkingHoursContainerState.get('error')
  );

export const makeSelectSuccess = () =>
  createSelector(
    selectCurrentBranchWorkingHoursContainer,
    (currentBranchWorkingHoursContainerState) =>
      currentBranchWorkingHoursContainerState.get('success')
  );

export const makeSelectCurrentBranchWorkingHours = () =>
  createSelector(
    selectCurrentBranchWorkingHoursContainer,
    (currentBranchWorkingHoursContainerState) =>
      currentBranchWorkingHoursContainerState
        .get('currentBranchWorkingHours')
        .toJS()
  );
