import { takeLatest, call, put } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_RUSH_HOURS } from './constants';
import { rushHoursLoaded, loadRushHoursError } from './actions';
import { API_URL } from '../../utils/constants';
import { formatToMeterSelectionFilter } from '../../utils/formatToMeterSelectionFilter';

export default function* rushHoursData() {
  yield takeLatest(LOAD_RUSH_HOURS, getRushHoursData);
}

export function* getRushHoursData({ params }) {
  try {
    const rushHoursDataFromRequest = yield call(
      getRequest,
      `${API_URL}/distributionrush`,
      formatToMeterSelectionFilter(params)
    );
    yield put(rushHoursLoaded({
      ...rushHoursDataFromRequest.data,
      rushHoursFareAndWorkingHoursErrors: rushHoursDataFromRequest.errors,
    }));
  } catch (error) {
    yield put(loadRushHoursError(error));
  }
}
