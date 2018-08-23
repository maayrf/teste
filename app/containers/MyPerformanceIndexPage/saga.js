import { takeLatest, call, put, all } from 'redux-saga/effects';
import request, {
  deleteRequest,
  putRequest,
  postRequest,
} from '../../utils/request';
import {
  CREATE_MY_PERFORMANCE_INDEX,
  EDIT_MY_PERFORMANCE_INDEX,
  LOAD_MY_PERFORMANCE_INDEXS,
  REMOVE_MY_PERFORMANCE_INDEX,
} from './constants';
import {
  createMyPerformanceIndexError,
  editMyPerformanceIndexError,
  loadMyPerformanceIndexsError,
  myPerformanceIndexCreated,
  myPerformanceIndexEdited,
  myPerformanceIndexRemoved,
  myPerformanceIndexsLoaded,
  removeMyPerformanceIndexError,
} from './actions';
import { normalizeMyPerformanceIndexs } from './normalizr';
import { fromJS } from '../../../node_modules/immutable/dist/immutable';
import { API_URL } from '../../utils/constants';

export default function* myPerformanceIndexsData() {
  yield all([
    takeLatest(LOAD_MY_PERFORMANCE_INDEXS, getAllMyPerformanceIndexs),
    takeLatest(CREATE_MY_PERFORMANCE_INDEX, createMyPerformanceIndex),
    takeLatest(EDIT_MY_PERFORMANCE_INDEX, editMyPerformanceIndex),
    takeLatest(REMOVE_MY_PERFORMANCE_INDEX, removeMyPerformanceIndex),
  ]);
}

export function* getAllMyPerformanceIndexs() {
  try {
    let myPerformanceIndexs = yield call(
      request,
      `${API_URL}/myPerformanceIndexs`
    );
    myPerformanceIndexs = myPerformanceIndexs.length
      ? normalizeMyPerformanceIndexs(myPerformanceIndexs).entities
        .myPerformanceIndex
      : {};
    myPerformanceIndexs = fromJS(myPerformanceIndexs);
    yield put(myPerformanceIndexsLoaded(myPerformanceIndexs));
  } catch (error) {
    yield put(loadMyPerformanceIndexsError(error));
  }
}

export function* createMyPerformanceIndex({ resolve, reject, ...action }) {
  try {
    let myPerformanceIndex = yield call(
      postRequest,
      `${API_URL}/performanceConfiguration`,
      action.myPerformanceIndex
    );
    myPerformanceIndex = myPerformanceIndex.data;
    yield put(myPerformanceIndexCreated(myPerformanceIndex));
    resolve(myPerformanceIndex);
  } catch (error) {
    yield put(createMyPerformanceIndexError(error));
    reject(error);
  }
}

export function* editMyPerformanceIndex({ resolve, reject, ...action }) {
  try {
    const myPerformanceIndex = yield call(
      putRequest,
      `${API_URL}/myPerformanceIndexs/${action.myPerformanceIndex.id}`,
      action.myPerformanceIndex
    );
    yield put(myPerformanceIndexEdited(myPerformanceIndex));
    resolve(myPerformanceIndex);
  } catch (error) {
    yield put(editMyPerformanceIndexError(error));
    reject(error);
  }
}

export function* removeMyPerformanceIndex({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/myPerformanceIndexs/${id}`);
    yield put(myPerformanceIndexRemoved(id));
  } catch (error) {
    yield put(removeMyPerformanceIndexError(id, error));
  }
}
