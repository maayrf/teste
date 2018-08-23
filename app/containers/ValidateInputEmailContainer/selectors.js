import { createSelector } from 'reselect';

export const selectValidateInputEmails = (state) => state.get('availableEmail');

export const makeSelectValidateInputEmailsLoading = () =>
  createSelector(selectValidateInputEmails, (validateInputEmailState) =>
    validateInputEmailState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectValidateInputEmails, (validateInputEmailState) =>
    validateInputEmailState.get('error'));

export const makeSelectAvailableEmail = () =>
  createSelector(selectValidateInputEmails, (validateInputEmailState) =>
    validateInputEmailState.get('availableEmail').toJS());
