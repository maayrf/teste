import { createSelector } from 'reselect';

export const selectCompanyInfoForms = (state) => state.get('companyInfoForm');

export const makeSelectCompanyInfoLoading = () =>
  createSelector(selectCompanyInfoForms, (companyInfoFormState) =>
    companyInfoFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectCompanyInfoForms, (companyInfoFormState) =>
    companyInfoFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectCompanyInfoForms, (companyInfoFormState) =>
    companyInfoFormState.get('success'));
