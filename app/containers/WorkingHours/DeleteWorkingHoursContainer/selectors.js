import { createSelector } from 'reselect';

export const selectDeleteWorkingHoursContainer = (state) =>
  state.get('deleteWorkingHours');

export const makeSelectDeleteWorkingHoursLoading = () =>
  createSelector(
    selectDeleteWorkingHoursContainer,
    (deleteWorkingHoursFormState) =>
      deleteWorkingHoursFormState.get('loadingDelete')
  );
//
// export const makeSelectDeleteError = () =>
//   createSelector(selectDeleteWorkingHoursContainer, (deleteWorkingHoursFormState) =>
//     deleteWorkingHoursFormState.get('errorDelete'));
//
export const makeSelectDeleteSuccess = () =>
  createSelector(
    selectDeleteWorkingHoursContainer,
    (deleteWorkingHoursFormState) =>
      deleteWorkingHoursFormState.get('successDelete')
  );
