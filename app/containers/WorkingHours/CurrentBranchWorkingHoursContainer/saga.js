import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../../utils/request';
import { API_URL } from '../../../utils/constants';
import {
  currentBranchWorkingHoursLoaded,
  loadCurrentBranchWorkingHoursError,
} from './actions';
import { LOAD_CURRENT_WORKING_HOURS_OF_BRANCH } from './constants';
import moment from 'moment/moment';

export default function* branchCurrentWorkingHoursData() {
  yield all([
    takeLatest(
      LOAD_CURRENT_WORKING_HOURS_OF_BRANCH,
      getBranchCurrentWorkingHours
    ),
  ]);
}

const formatWorkingHour = ({ startDate, endDate, ...data }) => ({
  ...data,
  startDate: moment(startDate),
  endDate: endDate ? moment(endDate) : null,
});

export function* getBranchCurrentWorkingHours({ branchId }) {
  try {
    const branchOrMeterCurrentWorkingHours = yield call(
      getRequest,
      `${API_URL}/branch/${branchId}/currentWorkingHour`
    );
    yield put(currentBranchWorkingHoursLoaded(formatWorkingHour(branchOrMeterCurrentWorkingHours.data)));
  } catch (error) {
    yield put(loadCurrentBranchWorkingHoursError(error));
  }
}
