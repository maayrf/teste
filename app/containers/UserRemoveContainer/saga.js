import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest } from '../../utils/request';
import { REMOVE_USER } from './constants';
import { removeUserError, userRemoved } from './actions';
import { API_URL } from '../../utils/constants';

export default function* userRemoveSaga() {
  yield all([takeLatest(REMOVE_USER, setRemoveUser)]);
}

export function* setRemoveUser({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/user/${id}`);
    yield put(userRemoved(id));
  } catch (error) {
    yield put(removeUserError(error));
  }
}
