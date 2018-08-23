import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../../utils/request';
import { LOAD_BRANCH_WORKING_HOURS } from './constants';
import {
  loadBranchWorkingHoursError,
  branchWorkingHoursLoaded,
} from './actions';
import { API_URL } from '../../../utils/constants';
import { formatDateInterval } from '../../../utils/formatDatesInterval';

export default function* branchOrMeterPaginatedWorkingHoursData() {
  yield all([takeLatest(LOAD_BRANCH_WORKING_HOURS, getBranchWorkingHours)]);
}

export function* getBranchWorkingHours({ branchId, params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/branch/${branchId}/workingHour`,
      params
    );
    const { limit, offset, filtered: totalCount } = response.data;
    const workinHours = formatDateInterval(response.data.items);
    yield put(branchWorkingHoursLoaded(workinHours, totalCount, limit, offset));
  } catch (error) {
    yield put(loadBranchWorkingHoursError(error));
  }
}
