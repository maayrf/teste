import { createSelector } from 'reselect';

export const selectWorkingHoursForms = (state) => state.get('workingHoursForm');

export const makeSelectWorkingHoursLoading = () =>
  createSelector(selectWorkingHoursForms, (workingHoursFormState) =>
    workingHoursFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectWorkingHoursForms, (workingHoursFormState) =>
    workingHoursFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectWorkingHoursForms, (workingHoursFormState) =>
    workingHoursFormState.get('success'));
