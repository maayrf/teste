import { fromJS } from 'immutable';
import {
  LOAD_COMPANIES,
  LOAD_COMPANIES_SUCCESS,
  LOAD_COMPANIES_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  companies: {},
});

function companiesMailAutoCompleteReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMPANIES:
      return state.set('loading', true).set('error', null);
    case LOAD_COMPANIES_SUCCESS:
      return state.set('loading', false).set('companies', action.companies);
    case LOAD_COMPANIES_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default companiesMailAutoCompleteReducer;
