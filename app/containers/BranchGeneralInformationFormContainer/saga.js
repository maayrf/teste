import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_BRANCH_GENERAL_INFORMATION,
  EDIT_BRANCH_GENERAL_INFORMATION,
  REMOVE_BRANCH_GENERAL_INFORMATION,
} from './constants';
import {
  createBranchGeneralInformationFormError,
  editBranchGeneralInformationError,
  branchGeneralInformationCreated,
  branchGeneralInformationEdited,
  branchGeneralInformationRemoved,
  removeBranchGeneralInformationError,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* branchGeneralInformationSaga() {
  yield all([
    takeLatest(
      CREATE_BRANCH_GENERAL_INFORMATION,
      createBranchGeneralInformationForm
    ),
    takeLatest(
      EDIT_BRANCH_GENERAL_INFORMATION,
      editBranchGeneralInformationForm
    ),
    takeLatest(
      REMOVE_BRANCH_GENERAL_INFORMATION,
      removeBranchGeneralInformation
    ),
  ]);
}

export function* createBranchGeneralInformationForm({
  branchGeneralInformation,
  resolve,
  reject,
}) {
  try {
    let branchGeneralInformationForm = yield call(
      postRequest,
      `${API_URL}/branch`,
      branchGeneralInformation
    );
    branchGeneralInformationForm = branchGeneralInformationForm.data;
    yield put(branchGeneralInformationCreated(branchGeneralInformationForm));
    resolve(branchGeneralInformationForm);
  } catch (error) {
    yield put(createBranchGeneralInformationFormError(error));
    reject(error);
  }
}

export function* editBranchGeneralInformationForm({
  branchGeneralInformation,
  resolve,
  reject,
}) {
  try {
    let branchGeneralInformationForm = yield call(
      putRequest,
      `${API_URL}/branch/${branchGeneralInformation.id}`,
      branchGeneralInformation
    );
    branchGeneralInformationForm = branchGeneralInformationForm.data;
    yield put(branchGeneralInformationEdited(branchGeneralInformationForm));
    resolve(branchGeneralInformationForm);
  } catch (error) {
    yield put(editBranchGeneralInformationError(error));
    reject(error);
  }
}

export function* removeBranchGeneralInformation({ id, resolve, reject }) {
  try {
    yield call(deleteRequest, `${API_URL}/branch/${id}`);
    yield put(branchGeneralInformationRemoved(id));
    resolve(id);
  } catch (error) {
    yield put(removeBranchGeneralInformationError(id, error));
    reject(error);
  }
}
