import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_VALIDATE_INPUT_EMAILS } from './constants';
import {
  loadValidateInputEmailsError,
  validateInputEmailsLoaded,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* validateInputEmailsData() {
  yield all([
    takeLatest(LOAD_VALIDATE_INPUT_EMAILS, getAllValidateInputEmails),
  ]);
}

export function* getAllValidateInputEmails({ email }) {
  try {
    const availableEmail = yield call(
      getRequest,
      `${API_URL}/user/available?email=${email}`
    );
    yield put(validateInputEmailsLoaded(availableEmail));
  } catch (error) {
    yield put(loadValidateInputEmailsError(error));
  }
}
