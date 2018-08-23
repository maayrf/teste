import { createSelector } from 'reselect';

export const selectForgetPasswordForms = (state) => state.get('forgetPassword');

export const makeSelectForgetPasswordLoading = () =>
  createSelector(selectForgetPasswordForms, (forgetPasswordFormState) =>
    forgetPasswordFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectForgetPasswordForms, (forgetPasswordFormState) =>
    forgetPasswordFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectForgetPasswordForms, (forgetPasswordFormState) =>
    forgetPasswordFormState.get('success'));
