import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import { LOAD_METER_TREE } from './constants';
import { loadMeterTreesError, meterTreesLoaded } from './actions';
import { normalizeMeterTrees } from './normalizr';
import { API_URL } from '../../utils/constants';

export default function* meterTreesData() {
  yield all([takeLatest(LOAD_METER_TREE, getAllMeterTrees)]);
}

export function* getAllMeterTrees({ params }) {
  try {
    const response = yield call(getRequest, `${API_URL}/branch`, {
      withEggs: 1,
      ...params,
    });
    let meterTrees = response.data.items.length
      ? normalizeMeterTrees(response.data.items).entities.meterTrees
      : {};
    meterTrees = fromJS(meterTrees);
    yield put(meterTreesLoaded(meterTrees));
  } catch (error) {
    yield put(loadMeterTreesError(error));
  }
}
