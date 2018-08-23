import { fromJS } from 'immutable';
import {
  LOAD_COMPANIES,
  LOAD_COMPANIES_SUCCESS,
  LOAD_COMPANIES_ERROR,
  SELECT_COMPANY,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  companies: {},
  totalCount: 0,
  limit: 15,
  selectedCompany: {},
});

function companyReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_COMPANY:
      return state.set('selectedCompany', action.company);
    case LOAD_COMPANIES:
      return state.set('loading', true).set('error', null);
    case LOAD_COMPANIES_SUCCESS:
      return state
        .set('loading', false)
        .set('companies', action.companies)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit);
    case LOAD_COMPANIES_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default companyReducer;
