import {
  REMOVE_COMPANY_INFO,
  REMOVE_COMPANY_INFO_ERROR,
  REMOVE_COMPANY_INFO_SUCCESS,
  CREATE_COMPANY_INFO,
  CREATE_COMPANY_INFO_ERROR,
  CREATE_COMPANY_INFO_SUCCESS,
  EDIT_COMPANY_INFO,
  EDIT_COMPANY_INFO_ERROR,
  EDIT_COMPANY_INFO_SUCCESS,
} from './constants';

// CREATE COMPANY_INFO_FORM
export function createCompanyInfo(companyInfo) {
  return {
    type: CREATE_COMPANY_INFO,
    companyInfo,
  };
}

export function createCompanyInfoFormError(error) {
  return {
    type: CREATE_COMPANY_INFO_ERROR,
    error,
  };
}

export function companyInfoCreated(companyInfo) {
  return {
    type: CREATE_COMPANY_INFO_SUCCESS,
    companyInfo,
  };
}
// END CREATE COMPANY_INFO_FORM

// EDIT COMPANY_INFO_FORM
export function editCompanyInfo(companyInfo, isFormData = false) {
  return {
    type: EDIT_COMPANY_INFO,
    companyInfo,
    isFormData,
  };
}

export function editCompanyInfoError(error) {
  return {
    type: EDIT_COMPANY_INFO_ERROR,
    error,
  };
}

export function companyInfoEdited(companyInfo) {
  return {
    type: EDIT_COMPANY_INFO_SUCCESS,
    companyInfo,
  };
}
// END EDIT COMPANY_INFO_FORM

// REMOVE COMPANY_INFO_FORM
export function removeCompanyInfoForm(id) {
  return {
    type: REMOVE_COMPANY_INFO,
    id,
  };
}

export function removeCompanyInfoError(error) {
  return {
    type: REMOVE_COMPANY_INFO_ERROR,
    error,
  };
}

export function companyInfoRemoved(id) {
  return {
    type: REMOVE_COMPANY_INFO_SUCCESS,
    id,
  };
}

// END REMOVE COMPANY_INFO_FORM
