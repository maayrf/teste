import { createSelector } from 'reselect';

export const selectCurrentEggWorkingHoursContainer = (state) =>
  state.get('currentEggWorkingHours');

export const makeSelectLoading = () =>
  createSelector(
    selectCurrentEggWorkingHoursContainer,
    (currentEggWorkingHoursContainerState) =>
      currentEggWorkingHoursContainerState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectCurrentEggWorkingHoursContainer,
    (currentEggWorkingHoursContainerState) =>
      currentEggWorkingHoursContainerState.get('error')
  );

export const makeSelectSuccess = () =>
  createSelector(
    selectCurrentEggWorkingHoursContainer,
    (currentEggWorkingHoursContainerState) =>
      currentEggWorkingHoursContainerState.get('success')
  );

export const makeSelectCurrentEggWorkingHours = () =>
  createSelector(
    selectCurrentEggWorkingHoursContainer,
    (currentEggWorkingHoursContainerState) =>
      currentEggWorkingHoursContainerState.get('currentEggWorkingHours').toJS()
  );
