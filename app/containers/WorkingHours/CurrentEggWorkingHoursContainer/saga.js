import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../../utils/request';
import { API_URL } from '../../../utils/constants';
import {
  currentEggWorkingHoursLoaded,
  loadCurrentEggWorkingHoursError,
} from './actions';
import { LOAD_CURRENT_WORKING_HOURS_OF_EGG } from './constants';
import moment from 'moment';

export default function* eggCurrentWorkingHoursData() {
  yield all([
    takeLatest(LOAD_CURRENT_WORKING_HOURS_OF_EGG, getEggCurrentWorkingHours),
  ]);
}

const formatWorkingHour = ({ startDate, endDate, ...data }) => ({
  ...data,
  startDate: moment(startDate),
  endDate: endDate ? moment(endDate) : null,
});

export function* getEggCurrentWorkingHours({ eggId }) {
  try {
    const eggCurrentWorkingHours = yield call(
      getRequest,
      `${API_URL}/egg/${eggId}/currentWorkingHour`
    );
    yield put(currentEggWorkingHoursLoaded(formatWorkingHour(eggCurrentWorkingHours.data)));
  } catch (error) {
    yield put(loadCurrentEggWorkingHoursError(error));
  }
}
