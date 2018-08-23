import { takeLatest, call, put, all } from 'redux-saga/effects';
import { putRequest } from '../../utils/request';
import { EDIT_DISABLE_DEMAND_EXCEED_FARE } from './constants';
import {
  editDisableDemandExceedFareError,
  disableDemandExceedFareEdited,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* disableDemandExceedFareSaga() {
  yield all([
    takeLatest(
      EDIT_DISABLE_DEMAND_EXCEED_FARE,
      editDisableDemandExceedFareForm
    ),
  ]);
}

export function* editDisableDemandExceedFareForm({ disableDemandExceedFare }) {
  try {
    const disableDemandExceedFareForm = yield call(
      putRequest,
      `${API_URL}/demandExceedingFare/${disableDemandExceedFare.id}`,
      disableDemandExceedFare
    );
    yield put(disableDemandExceedFareEdited(disableDemandExceedFareForm.data));
  } catch (error) {
    yield put(editDisableDemandExceedFareError(error));
  }
}
