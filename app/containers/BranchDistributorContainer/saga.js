import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest, putRequest } from '../../utils/request';
import {
  EDIT_BRANCH_DISTRIBUTORS,
  LOAD_BRANCH_DISTRIBUTORS,
} from './constants';
import {
  loadBranchDistributorsError,
  branchDistributorsLoaded,
  branchDistributorsEdited,
  editBranchDistributorsError,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* branchDistributorsData() {
  yield all([
    takeLatest(LOAD_BRANCH_DISTRIBUTORS, getAllBranchDistributors),
    takeLatest(EDIT_BRANCH_DISTRIBUTORS, editBranchDistributor),
  ]);
}

export function* getAllBranchDistributors({ branchId }) {
  try {
    let branchDistributors = yield call(
      getRequest,
      `${API_URL}/branch/${branchId}/distributionCompany`
    );
    branchDistributors = branchDistributors.data;
    branchDistributors = fromJS(branchDistributors);
    yield put(branchDistributorsLoaded(branchDistributors));
  } catch (error) {
    yield put(loadBranchDistributorsError(error));
  }
}

export function* editBranchDistributor({ resolve, reject, ...action }) {
  try {
    const { branchDistributorData } = action;
    let branchDistributor = yield call(
      putRequest,
      `${API_URL}/branch/${branchDistributorData.id}/distributionCompany`,
      branchDistributorData
    );
    branchDistributor = branchDistributor.data;
    branchDistributor = fromJS(branchDistributor);
    yield put(branchDistributorsEdited(branchDistributor));
    yield resolve(branchDistributor);
  } catch (error) {
    yield put(editBranchDistributorsError(error));
    yield reject(error);
  }
}
