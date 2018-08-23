import { createSelector } from 'reselect';
import { separateCurrentPreviousNext } from '../../../utils/separateCurrentPreviousNext';

export const selectEggWorkingHoursContainer = (state) =>
  state.get('eggWorkingHours');

export const makeSelectLimit = () =>
  createSelector(
    selectEggWorkingHoursContainer,
    (branchWorkingHoursContainerState) =>
      branchWorkingHoursContainerState.get('limit')
  );

export const makeSelectTotalCount = () =>
  createSelector(
    selectEggWorkingHoursContainer,
    (branchWorkingHoursContainerState) =>
      branchWorkingHoursContainerState.get('totalCount')
  );

export const makeSelectWorkingHoursContainerLoading = () =>
  createSelector(
    selectEggWorkingHoursContainer,
    (eggWorkingHoursContainerState) =>
      eggWorkingHoursContainerState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectEggWorkingHoursContainer,
    (eggWorkingHoursContainerState) =>
      eggWorkingHoursContainerState.get('error')
  );

export const makeSelectWorkingHoursContainer = () =>
  createSelector(
    selectEggWorkingHoursContainer,
    (eggWorkingHoursContainerState) =>
      eggWorkingHoursContainerState.get('workingHours').toJS()
  );
