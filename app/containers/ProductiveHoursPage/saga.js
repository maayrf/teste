import { takeLatest, call, put } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_PRODUCTIVE_HOURS } from './constants';
import {
  productiveHoursLoaded,
  loadProductiveHoursError,
  productiveHoursFareAndWorkingHoursErrorsLoaded,
} from './actions';
import { API_URL } from '../../utils/constants';
import { formatToMeterSelectionFilter } from '../../utils/formatToMeterSelectionFilter';

export default function* productiveHoursData() {
  yield takeLatest(LOAD_PRODUCTIVE_HOURS, getProductiveHoursData);
}

export function* getProductiveHoursData({ params }) {
  try {
    const productiveHoursDataFromRequest = yield call(
      getRequest,
      `${API_URL}/distributionproductive`,
      formatToMeterSelectionFilter(params)
    );
    yield put(productiveHoursFareAndWorkingHoursErrorsLoaded(productiveHoursDataFromRequest.errors));
    yield put(productiveHoursLoaded(productiveHoursDataFromRequest.data));
  } catch (error) {
    yield put(loadProductiveHoursError(error));
  }
}
