import { fromJS } from 'immutable';
import {
  LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID,
  LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID_ERROR,
  LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID_SUCCESS,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: true,
  error: null,
  success: null,
});

function eggDetailGeneralInformationReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID:
      return state
        .set('loading', true)
        .set('success', null)
        .set('error', null);
    case LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID_ERROR:
      return state
        .set('loading', false)
        .set('success', null)
        .set('error', action.error);
    case LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID_SUCCESS:
      return state
        .set('loading', false)
        .set('success', {
          eggDetailGeneralInformation: action.eggDetailGeneralInformation,
          message: 'Pego com sucesso!',
        })
        .set('error', null);
    default:
      return state;
  }
}

export default eggDetailGeneralInformationReducer;
