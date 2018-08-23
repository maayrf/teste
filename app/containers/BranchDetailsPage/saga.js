import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  deleteRequest,
  putRequest,
  postRequest,
  getRequest,
} from '../../utils/request';
import {
  CREATE_BRANCH_DETAILS,
  EDIT_BRANCH_DETAILS,
  LOAD_BRANCH_DETAILS,
  REMOVE_BRANCH_DETAILS,
} from './constants';
import {
  createBranchDetailsError,
  editBranchDetailsError,
  loadBranchDetailsError,
  branchDetailsCreated,
  branchDetailsEdited,
  branchDetailsRemoved,
  branchDetailsLoaded,
  removeBranchDetailsError,
} from './actions';
import { fromJS } from '../../../node_modules/immutable/dist/immutable';
import { API_URL } from '../../utils/constants';

export default function* branchDetailsData() {
  yield all([
    takeLatest(LOAD_BRANCH_DETAILS, getAllBranchDetails),
    takeLatest(CREATE_BRANCH_DETAILS, createBranchDetails),
    takeLatest(EDIT_BRANCH_DETAILS, editBranchDetails),
    takeLatest(REMOVE_BRANCH_DETAILS, removeBranchDetails),
  ]);
}

export function* getAllBranchDetails({ id }) {
  try {
    let branchDetails = yield call(getRequest, `${API_URL}/branch/${id}`);
    branchDetails = fromJS(branchDetails.data);
    yield put(branchDetailsLoaded(branchDetails));
  } catch (error) {
    yield put(loadBranchDetailsError(error));
  }
}

export function* createBranchDetails({ resolve, reject, ...action }) {
  try {
    const branchDetails = yield call(
      postRequest,
      `${API_URL}branch`,
      action.branchDetails
    );
    yield put(branchDetailsCreated(branchDetails));
    resolve(branchDetails);
  } catch (error) {
    yield put(createBranchDetailsError(error));
    reject(error);
  }
}

export function* editBranchDetails({ resolve, reject, ...action }) {
  try {
    const { id } = action.branchDetails;
    const branchDetails = yield call(
      putRequest,
      `${API_URL}/branch/${id}`,
      action.branchDetails
    );
    yield put(branchDetailsEdited(branchDetails.data));
    resolve(branchDetails.data);
  } catch (error) {
    yield put(editBranchDetailsError(error));
    reject(error);
  }
}

export function* removeBranchDetails({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}branch/${id}`);
    yield put(branchDetailsRemoved(id));
  } catch (error) {
    yield put(removeBranchDetailsError(id, error));
  }
}
