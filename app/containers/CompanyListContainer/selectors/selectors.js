import { createSelector } from 'reselect';
import { denormalizeCompanys } from '../normalizr';

export const selectCompanies = (reducerKey = 'companies') => (state) =>
  state.get(reducerKey);

export const makeSelectSelectedCompany = (reducerKey = 'companies') =>
  createSelector(selectCompanies(reducerKey), (companyState) =>
    companyState.get('selectedCompany'));

export const makeSelectCompanysLoading = (reducerKey = 'companies') =>
  createSelector(selectCompanies(reducerKey), (companyState) =>
    companyState.get('loading'));

export const makeSelectError = (reducerKey = 'companies') =>
  createSelector(selectCompanies(reducerKey), (companyState) =>
    companyState.get('error'));

export const makeSelectCompanies = (reducerKey = 'companies') =>
  createSelector(selectCompanies(reducerKey), (companyState) =>
    denormalizeCompanys(companyState.get('companies').toJS()));

export const makeSelectLimit = (reducerKey = 'companies') =>
  createSelector(selectCompanies(reducerKey), (companyState) =>
    companyState.get('limit'));

export const makeSelectTotalCount = (reducerKey = 'companies') =>
  createSelector(selectCompanies(reducerKey), (companyState) =>
    companyState.get('totalCount'));
