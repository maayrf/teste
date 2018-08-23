import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_AUTOCOMPLETE_BRANCHES } from './constants';
import {
  loadAutocompleteBranchesError,
  autocompleteBranchesLoaded,
} from './actions';
import { normalizeAutocompleteBranchess } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* autocompleteBranchessData() {
  yield all([
    takeLatest(LOAD_AUTOCOMPLETE_BRANCHES, getAllAutocompleteBranches),
  ]);
}

export function* getAllAutocompleteBranches({ params }) {
  try {
    let listBranches = yield call(getRequest, `${API_URL}/branch`, params);
    listBranches = listBranches.data.items;
    listBranches = listBranches.length
      ? normalizeAutocompleteBranchess(listBranches).entities.listBranches
      : {};
    listBranches = fromJS(listBranches);
    yield put(autocompleteBranchesLoaded(listBranches));
  } catch (error) {
    yield put(loadAutocompleteBranchesError(error));
  }
}
