import { createSelector } from 'reselect';

export const selectUserRemoveButtons = (state) => state.get('userRemove');

export const makeSelectUserRemoveLoading = () =>
  createSelector(selectUserRemoveButtons, (userRemoveButtonState) =>
    userRemoveButtonState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectUserRemoveButtons, (userRemoveButtonState) =>
    userRemoveButtonState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectUserRemoveButtons, (userRemoveButtonState) =>
    userRemoveButtonState.get('success'));
