import {
  LOAD_COMPANIES,
  LOAD_COMPANIES_ERROR,
  LOAD_COMPANIES_SUCCESS,
  SELECT_COMPANY,
} from './constants';

// COMPANY SELECTION
export function selectCompany(company) {
  return {
    type: SELECT_COMPANY,
    company,
  };
}

// COMPANY LOAD

export function loadCompanies(params) {
  return {
    type: LOAD_COMPANIES,
    params,
  };
}

export function companiesLoaded(companies, totalCount, limit, offset) {
  return {
    type: LOAD_COMPANIES_SUCCESS,
    companies,
    totalCount,
    limit,
    offset,
  };
}

export function loadCompaniesError(error) {
  return {
    type: LOAD_COMPANIES_ERROR,
    error,
  };
}
// END COMPANY LOAD
