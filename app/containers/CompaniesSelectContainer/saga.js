import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_COMPANIES } from './constants';
import { loadCompaniesError, companiesLoaded } from './actions';
import { normalizeCompanies } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* companiesData() {
  yield all([takeLatest(LOAD_COMPANIES, getAllCompanies)]);
}

export function* getAllCompanies({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/company`, params);
    let companies = response.data.items.length
      ? normalizeCompanies(response.data.items).entities.companies
      : {};
    companies = fromJS(companies);
    yield put(companiesLoaded(companies));
  } catch (error) {
    yield put(loadCompaniesError(error));
  }
}
