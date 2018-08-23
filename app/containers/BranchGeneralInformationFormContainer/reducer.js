import { fromJS } from 'immutable';
import {
  REMOVE_BRANCH_GENERAL_INFORMATION,
  REMOVE_BRANCH_GENERAL_INFORMATION_SUCCESS,
  REMOVE_BRANCH_GENERAL_INFORMATION_ERROR,
  CREATE_BRANCH_GENERAL_INFORMATION,
  CREATE_BRANCH_GENERAL_INFORMATION_SUCCESS,
  CREATE_BRANCH_GENERAL_INFORMATION_ERROR,
  EDIT_BRANCH_GENERAL_INFORMATION_SUCCESS,
  EDIT_BRANCH_GENERAL_INFORMATION,
  EDIT_BRANCH_GENERAL_INFORMATION_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function branchGeneralInformationFormReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_BRANCH_GENERAL_INFORMATION:
      return state.set('loading', true).set('error', null);
    case REMOVE_BRANCH_GENERAL_INFORMATION_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['branchGeneralInformation', action.id.toString()]);
    case REMOVE_BRANCH_GENERAL_INFORMATION_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_BRANCH_GENERAL_INFORMATION:
      return state.set('loading', true).set('error', null);
    case CREATE_BRANCH_GENERAL_INFORMATION_SUCCESS:
      return state
        .set('success', {
          branchGeneralInformation: action.branchGeneralInformation,
          message: `BranchGeneralInformation ${
            action.branchGeneralInformation.id
          } criado com sucesso!`,
        })
        .set('loading', false);
    case CREATE_BRANCH_GENERAL_INFORMATION_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_BRANCH_GENERAL_INFORMATION:
      return state.set('loading', true).set('error', null);
    case EDIT_BRANCH_GENERAL_INFORMATION_SUCCESS:
      return state
        .set('success', {
          branchGeneralInformation: action.branchGeneralInformation,
          message: `BranchGeneralInformation ${
            action.branchGeneralInformation.id
          } editado com sucesso!`,
        })
        .set('loading', false);
    case EDIT_BRANCH_GENERAL_INFORMATION_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default branchGeneralInformationFormReducer;
