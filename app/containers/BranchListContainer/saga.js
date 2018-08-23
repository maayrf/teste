import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_BRANCHES } from './constants';
import { loadBranchesError, branchesLoaded, loadBranches } from './actions';
import { makeSelectLimit } from './selectors';
import { normalizeBranches } from './normalizr';
import { API_URL } from '../../utils/constants';
import { MOVE_METER_SUCCESS } from '../MeterManager/constants';

export default function* branchesSaga() {
  yield all([
    takeLatest(LOAD_BRANCHES, getAllBranches),
    takeLatest(MOVE_METER_SUCCESS, reloadBranches),
  ]);
}

export function* reloadBranches() {
  const limit = yield select(makeSelectLimit());
  yield put(loadBranches({
    limit,
  }));
}

export function* getAllBranches({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/branch`, params);
    const { total: totalCount, limit } = response.data;
    let branches = response.data.items.length
      ? normalizeBranches(response.data.items).entities.branches
      : {};
    branches = fromJS(branches);
    yield put(branchesLoaded(branches, totalCount, limit));
  } catch (error) {
    yield put(loadBranchesError(error));
  }
}
