import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../utils/constants';
import { LOAD_BRANCH_BY_ID } from './constants';
import { loadBranchByIdError, branchByIdLoaded } from './actions';

export default function* branchData() {
  yield all([takeLatest(LOAD_BRANCH_BY_ID, loadBranchById)]);
}

export function* loadBranchById({ id, params }) {
  try {
    const branch = yield call(getRequest, `${API_URL}/branch/${id}`, params);
    yield put(branchByIdLoaded(branch.data));
  } catch (error) {
    yield put(loadBranchByIdError(error));
  }
}
