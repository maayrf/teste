import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import moment from 'moment';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../utils/constants';
import { LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID } from './constants';
import { makeSelectSuccess } from './selectors';
import {
  loadEggDetailGeneralInformationByIdError,
  eggDetailGeneralInformationByIdLoaded,
  loadEggDetailGeneralInformationById,
} from './actions';
import { EDIT_EGG_CUSTOM_WORKING_HOUR_SUCCESS } from '../UseCustomWorkingHourCheckboxContainer/constants';

const formatEggDetail = (data) => {
  const { currentEggWorkingHours, currentBranchWorkingHours } = data;
  if (currentBranchWorkingHours) {
    currentBranchWorkingHours.startDate = moment(currentBranchWorkingHours.startDate);
    currentBranchWorkingHours.endDate = currentBranchWorkingHours.endDate
      ? moment(currentBranchWorkingHours.endDate)
      : null;
  }
  if (currentEggWorkingHours) {
    currentEggWorkingHours.startDate = moment(currentEggWorkingHours.startDate);
    currentEggWorkingHours.endDate = currentEggWorkingHours.endDate
      ? moment(currentEggWorkingHours.endDate)
      : null;
  }
  return {
    ...data,
    currentEggWorkingHours,
    currentBranchWorkingHours,
  };
};

export default function* eggDetailGeneralInformationData() {
  yield all([
    takeLatest(
      LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID,
      loadEggDetailGeneralInformationByIdData
    ),
    takeLatest(
      EDIT_EGG_CUSTOM_WORKING_HOUR_SUCCESS,
      reloadEggDetailGeneralInformationById
    ),
  ]);
}

export function* reloadEggDetailGeneralInformationById() {
  const eggDetailGeneralInformation = yield select(makeSelectSuccess());
  yield put(loadEggDetailGeneralInformationById(eggDetailGeneralInformation.eggDetailGeneralInformation.id));
}

export function* loadEggDetailGeneralInformationByIdData({ id }) {
  try {
    const eggDetailGeneralInformation = yield call(
      getRequest,
      `${API_URL}/egg/${id}`
    );
    yield put(eggDetailGeneralInformationByIdLoaded(formatEggDetail(eggDetailGeneralInformation.data)));
  } catch (error) {
    yield put(loadEggDetailGeneralInformationByIdError(error));
  }
}
