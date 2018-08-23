import { takeLatest, call, put, all } from 'redux-saga/effects';
import { postRequest } from '../../utils/request';
import { FORGET_PASSWORD } from './constants';
import { forgetPasswordError, forgetPasswordSuccess } from './actions';
import { API_URL } from '../../utils/constants';

export default function* forgetPasswordData() {
  yield all([takeLatest(FORGET_PASSWORD, forgetPasswordRequest)]);
}

export function* forgetPasswordRequest({ email }) {
  try {
    yield call(postRequest, `${API_URL}/resetpass`, email);
    yield put(forgetPasswordSuccess());
  } catch (error) {
    yield put(forgetPasswordError(error));
  }
}
