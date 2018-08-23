import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_USERS } from './constants';
import { loadUsers, loadUsersError, usersLoaded } from './actions';
import { normalizeUsers } from './normalizr';
import { API_URL } from '../../utils/constants';
import {
  CREATE_USER_SUCCESS,
  EDIT_USER_SUCCESS,
} from '../UserFormContainer/constants';
import { REMOVE_USER_SUCCESS } from '../UserRemoveContainer/constants';

export default function* usersData() {
  yield all([
    takeLatest(LOAD_USERS, getAllUsers),
    takeLatest(CREATE_USER_SUCCESS, reloadAllUsers),
    takeLatest(EDIT_USER_SUCCESS, reloadAllUsers),
    takeLatest(REMOVE_USER_SUCCESS, reloadAllUsers),
  ]);
}

export function* reloadAllUsers() {
  yield put(loadUsers());
}

export function* getAllUsers({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/user`, params);
    const { total: totalCount, limit } = response.data;
    let users = response.data.items.length
      ? normalizeUsers(response.data.items).entities.users
      : {};
    users = fromJS(users);
    yield put(usersLoaded(users, totalCount, limit));
  } catch (error) {
    yield put(loadUsersError(error));
  }
}
