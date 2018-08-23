import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_COMPANIES } from './constants';
import { loadCompaniesError, companiesLoaded } from './actions';
import { normalizeCompanies } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* companysData() {
  yield all([takeLatest(LOAD_COMPANIES, getAllCompanies)]);
}

export function* getAllCompanies({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/company`, params);
    const { total: totalCount, limit } = response.data;
    let companies = response.data.items;
    companies = companies.length
      ? normalizeCompanies(companies).entities.companies
      : {};
    companies = fromJS(companies);
    yield put(companiesLoaded(companies, totalCount, limit));
  } catch (error) {
    yield put(loadCompaniesError(error));
  }
}
