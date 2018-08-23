import { createSelector } from 'reselect';

export const selectBranchGeneralInformationForms = (state) =>
  state.get('branchGeneralInformationForm');

export const makeSelectBranchGeneralInformationLoading = () =>
  createSelector(
    selectBranchGeneralInformationForms,
    (branchGeneralInformationFormState) =>
      branchGeneralInformationFormState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectBranchGeneralInformationForms,
    (branchGeneralInformationFormState) =>
      branchGeneralInformationFormState.get('error')
  );

export const makeSelectSuccess = () =>
  createSelector(
    selectBranchGeneralInformationForms,
    (branchGeneralInformationFormState) =>
      branchGeneralInformationFormState.get('success')
  );
