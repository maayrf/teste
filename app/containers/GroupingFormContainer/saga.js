import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import { CREATE_GROUPING, EDIT_GROUPING, REMOVE_GROUPING } from './constants';
import {
  createGroupingFormError,
  editGroupingError,
  groupingFormCreated,
  groupingEdited,
  groupingRemoved,
  removeGroupingError,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* groupingData() {
  yield all([
    takeLatest(CREATE_GROUPING, createGroupingForm),
    takeLatest(EDIT_GROUPING, editGroupingForm),
    takeLatest(REMOVE_GROUPING, removeGrouping),
  ]);
}

export function* createGroupingForm({ grouping, resolve }) {
  try {
    const groupingForm = yield call(
      postRequest,
      `${API_URL}/grouping`,
      grouping
    );
    yield put(groupingFormCreated(groupingForm));
    resolve(groupingForm);
  } catch (error) {
    yield put(createGroupingFormError(error));
  }
}

export function* editGroupingForm({ grouping }) {
  try {
    const groupingForm = yield call(
      putRequest,
      `${API_URL}/grouping/${grouping.id}`,
      grouping
    );
    yield put(groupingEdited(groupingForm.data));
  } catch (error) {
    yield put(editGroupingError(error));
  }
}

export function* removeGrouping({ id, resolve, reject }) {
  try {
    yield call(deleteRequest, `${API_URL}/grouping/${id}`);
    yield put(groupingRemoved(id));
    yield resolve(id);
  } catch (error) {
    yield put(removeGroupingError(id, error));
    reject(error);
  }
}
