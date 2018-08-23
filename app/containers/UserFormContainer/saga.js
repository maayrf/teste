import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_USER,
  EDIT_MY_PROFILE,
  EDIT_USER,
  REMOVE_USER,
} from './constants';
import {
  createUserFormError,
  editUserError,
  userCreated,
  userEdited,
  userRemoved,
  removeUserError,
  editMyProfileSuccess,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* userData() {
  yield all([
    takeLatest(CREATE_USER, createUserForm),
    takeLatest(EDIT_USER, editUserForm),
    takeLatest(EDIT_MY_PROFILE, editMyProfile),
    takeLatest(REMOVE_USER, removeUser),
  ]);
}

export function* createUserForm({ user }) {
  try {
    const userForm = yield call(postRequest, `${API_URL}/user`, user);
    yield put(userCreated(userForm.data));
  } catch (error) {
    yield put(createUserFormError(error));
  }
}

export function* editUserForm({ user }) {
  try {
    const userForm = yield call(putRequest, `${API_URL}/user/${user.id}`, user);
    yield put(userEdited(userForm.data));
  } catch (error) {
    yield put(editUserError(error));
  }
}
export function* editMyProfile({ user }) {
  try {
    const userForm = yield call(putRequest, `${API_URL}/user/me`, user);
    yield put(editMyProfileSuccess(userForm.data));
  } catch (error) {
    yield put(editUserError(error));
  }
}

export function* removeUser({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/user/${id}`);
    yield put(userRemoved(id));
  } catch (error) {
    yield put(removeUserError(id, error));
  }
}
