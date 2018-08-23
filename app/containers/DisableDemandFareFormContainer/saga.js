import { takeLatest, call, put, all } from 'redux-saga/effects';
import { putRequest } from '../../utils/request';
import { EDIT_DISABLE_DEMAND_FARE } from './constants';
import { editDisableDemandFareError, disableDemandFareEdited } from './actions';
import { API_URL } from '../../utils/constants';

export default function* disableDemandFareSaga() {
  yield all([takeLatest(EDIT_DISABLE_DEMAND_FARE, editDisableDemandFareForm)]);
}

export function* editDisableDemandFareForm({ disableDemandFare }) {
  try {
    const disableDemandFareForm = yield call(
      putRequest,
      `${API_URL}/demandFare/${disableDemandFare.id}`,
      disableDemandFare
    );
    yield put(disableDemandFareEdited(disableDemandFareForm.data));
  } catch (error) {
    yield put(editDisableDemandFareError(error));
  }
}
