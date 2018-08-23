import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_COMPANY_INFO,
  EDIT_COMPANY_INFO,
  REMOVE_COMPANY_INFO,
} from './constants';
import {
  createCompanyInfoFormError,
  editCompanyInfoError,
  companyInfoFormCreated,
  companyInfoEdited,
  companyInfoRemoved,
  removeCompanyInfoError,
} from './actions';
import { API_URL } from '../../utils/constants';
import { changeCompanyOfLoggedUser } from '../LoginPage/actions';

export default function* companyInfoData() {
  yield all([
    takeLatest(CREATE_COMPANY_INFO, createCompanyInfoForm),
    takeLatest(EDIT_COMPANY_INFO, editCompanyInfoForm),
    takeLatest(REMOVE_COMPANY_INFO, removeCompanyInfo),
  ]);
}

export function* createCompanyInfoForm({ companyInfo }) {
  try {
    const companyInfoForm = yield call(
      postRequest,
      `${API_URL}/company`,
      companyInfo
    );
    yield put(companyInfoFormCreated(companyInfoForm.data));
  } catch (error) {
    yield put(createCompanyInfoFormError(error));
  }
}

export function* editCompanyInfoForm({ companyInfo, isFormData }) {
  try {
    const companyInfoForm = yield call(
      putRequest,
      `${API_URL}/me/company`,
      companyInfo.data,
      isFormData
    );
    yield put(changeCompanyOfLoggedUser(companyInfoForm.data));
    yield put(companyInfoEdited(companyInfoForm.data));
  } catch (error) {
    yield put(editCompanyInfoError(error));
  }
}

export function* removeCompanyInfo({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/company/${id}`);
    yield put(companyInfoRemoved(id));
  } catch (error) {
    yield put(removeCompanyInfoError(id, error));
  }
}
