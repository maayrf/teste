import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_USER_MAIL_AUTO_COMPLETES } from './constants';
import {
  loadUserMailAutoCompletesError,
  userMailAutoCompletesLoaded,
} from './actions';
import { normalizeUserMailAutoCompletes } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* userMailAutoCompletesData() {
  yield all([
    takeLatest(LOAD_USER_MAIL_AUTO_COMPLETES, getAllUserMailAutoCompletes),
  ]);
}

export function* getAllUserMailAutoCompletes({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/user`, params);
    let users = response.data.items.length
      ? normalizeUserMailAutoCompletes(response.data.items).entities
        .userMailAutoCompletes
      : {};
    users = fromJS(users);
    yield put(userMailAutoCompletesLoaded(users));
  } catch (error) {
    yield put(loadUserMailAutoCompletesError(error));
  }
}
