import { fromJS } from 'immutable';
import {
  REMOVE_COMPANY_INFO,
  REMOVE_COMPANY_INFO_SUCCESS,
  REMOVE_COMPANY_INFO_ERROR,
  CREATE_COMPANY_INFO,
  CREATE_COMPANY_INFO_SUCCESS,
  CREATE_COMPANY_INFO_ERROR,
  EDIT_COMPANY_INFO_SUCCESS,
  EDIT_COMPANY_INFO,
  EDIT_COMPANY_INFO_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function companyInfoFormReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_COMPANY_INFO:
      return state.set('loading', true).set('error', null);
    case REMOVE_COMPANY_INFO_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['companyInfo', action.id.toString()]);
    case REMOVE_COMPANY_INFO_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_COMPANY_INFO:
      return state.set('loading', true).set('error', null);
    case CREATE_COMPANY_INFO_SUCCESS:
      return state
        .set('success', {
          companyInfo: action.companyInfo,
          message: `Empresa ${action.companyInfo.id} criada com sucesso!`,
        })
        .set('loading', false);
    case CREATE_COMPANY_INFO_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_COMPANY_INFO:
      return state.set('loading', true).set('error', null);
    case EDIT_COMPANY_INFO_SUCCESS:
      return state
        .set('success', {
          companyInfo: action.companyInfo,
          message: `Empresa ${action.companyInfo.id} editada com sucesso!`,
        })
        .set('loading', false);
    case EDIT_COMPANY_INFO_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default companyInfoFormReducer;
