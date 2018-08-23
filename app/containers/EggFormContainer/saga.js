import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import {
  CREATE_EGG,
  EDIT_EGG,
  EDIT_EGG_ERROR,
  EDIT_EGG_SUCCESS,
  REMOVE_EGG,
} from './constants';
import {
  createEggFormError,
  editEggError,
  eggFormCreated,
  eggEdited,
  eggRemoved,
  removeEggError,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* eggData() {
  yield all([
    takeLatest(CREATE_EGG, createEggForm),
    takeLatest(EDIT_EGG, editEggForm),
    takeLatest(REMOVE_EGG, removeEgg),
  ]);
}

export function* createEggForm({ egg }) {
  try {
    const eggForm = yield call(postRequest, `${API_URL}/egg`, egg);
    yield put(eggFormCreated(eggForm.data));
  } catch (error) {
    yield put(createEggFormError(error));
  }
}

export function* editEggForm({ egg, type }) {
  try {
    const eggForm = yield call(putRequest, `${API_URL}/egg/${egg.id}`, egg);
    yield put({
      type: `${type}_SUCCESS`,
      egg: eggForm.data,
    });
  } catch (error) {
    yield put({
      type: `${type}_ERROR`,
      error,
    });
  }
}

export function* removeEgg({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/egg/${id}`);
    yield put(eggRemoved(id));
  } catch (error) {
    yield put(removeEggError(id, error));
  }
}
