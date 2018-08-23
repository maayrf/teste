import {
  LOAD_COMPANIES,
  LOAD_COMPANIES_ERROR,
  LOAD_COMPANIES_SUCCESS,
} from './constants';

// COMPANIES LOAD

export function loadCompanies(params) {
  return {
    type: LOAD_COMPANIES,
    params,
  };
}

export function companiesLoaded(companies) {
  return {
    type: LOAD_COMPANIES_SUCCESS,
    companies,
  };
}

export function loadCompaniesError(error) {
  return {
    type: LOAD_COMPANIES_ERROR,
    error,
  };
}
// END COMPANIES LOAD
