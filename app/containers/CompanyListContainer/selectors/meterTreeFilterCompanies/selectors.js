import { createSelector } from 'reselect';
import { denormalizeCompanys } from '../../normalizr';

export const selectCompanies = (state) => state.get('meterTreeFilterCompanies');

export const makeSelectSelectedCompany = () =>
  createSelector(selectCompanies, (companyState) =>
    companyState.get('selectedCompany'));

export const makeSelectCompanysLoading = () =>
  createSelector(selectCompanies, (companyState) =>
    companyState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectCompanies, (companyState) => companyState.get('error'));

export const makeSelectCompanies = () =>
  createSelector(selectCompanies, (companyState) =>
    denormalizeCompanys(companyState.get('companies').toJS()));

export const makeSelectLimit = () =>
  createSelector(selectCompanies, (companyState) => companyState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectCompanies, (companyState) =>
    companyState.get('totalCount'));
