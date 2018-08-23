import { takeLatest, call, put } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_APPORTIONMENTS } from './constants';
import {
  loadApportionmentsError,
  apportionmentsLoaded,
  apportionmentsFareAndWorkingHoursErrorsLoaded,
} from './actions';
import { API_URL } from '../../utils/constants';
import { formatToMeterSelectionFilter } from '../../utils/formatToMeterSelectionFilter';

export default function* apportionmentData() {
  yield takeLatest(LOAD_APPORTIONMENTS, getApportionmentData);
}

export function* getApportionmentData({ params }) {
  try {
    const apportionmentDataFromRequest = yield call(
      getRequest,
      `${API_URL}/distribution`,
      formatToMeterSelectionFilter(params)
    );
    yield put(apportionmentsFareAndWorkingHoursErrorsLoaded(apportionmentDataFromRequest.errors));
    yield put(apportionmentsLoaded(apportionmentDataFromRequest.data));
  } catch (error) {
    yield put(loadApportionmentsError(error));
  }
}
