import { createSelector } from 'reselect';
import { denormalizeCompanies } from './normalizr';

export const selectCompanies = (state) => state.get('companiesSelect');

export const makeSelectCompaniesLoading = () =>
  createSelector(selectCompanies, (companiesMailAutoCompleteState) =>
    companiesMailAutoCompleteState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectCompanies, (companiesMailAutoCompleteState) =>
    companiesMailAutoCompleteState.get('error'));

export const makeSelectCompanies = () =>
  createSelector(selectCompanies, (companiesMailAutoCompleteState) =>
    denormalizeCompanies(companiesMailAutoCompleteState.get('companies').toJS()));

export const makeSelectLimit = () =>
  createSelector(selectCompanies, (companiesMailAutoCompleteState) =>
    companiesMailAutoCompleteState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectCompanies, (companiesMailAutoCompleteState) =>
    companiesMailAutoCompleteState.get('totalCount'));
