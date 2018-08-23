import { takeLatest, call, put, all } from 'redux-saga/effects';
import { putRequest, postRequest } from '../../../utils/request';
import { CREATE_WORKING_HOURS, EDIT_WORKING_HOURS } from './constants';
import {
  createWorkingHoursFormError,
  editWorkingHoursError,
  workingHoursFormCreated,
  workingHoursEdited,
} from './actions';
import { API_URL } from '../../../utils/constants';

export default function* workingHoursData() {
  yield all([
    takeLatest(CREATE_WORKING_HOURS, createWorkingHoursForm),
    takeLatest(EDIT_WORKING_HOURS, editWorkingHoursForm),
  ]);
}

function formatData(data) {
  const newData = {
    ...data,
    startDate: data.startDate.format('YYYY-MM-DD'),
  };
  if (newData.endDate) {
    newData.endDate = data.endDate.format('YYYY-MM-DD');
  }
  return newData;
}

function* createWorkingHoursForm({
  workingHours,
  onCreateSuccess,
  meterType,
  meterId,
}) {
  try {
    // TODO: separate into two actions -> CREATE_EGG_WORKING_HOURS and CREATE_BRANCH_WORKING_HOURS
    const workingHoursForm = yield call(
      postRequest,
      `${API_URL}/${meterType.toLowerCase()}/${meterId}/workingHour`,
      formatData(workingHours)
    );
    onCreateSuccess(workingHoursForm.data);
    yield put(workingHoursFormCreated(workingHoursForm.data));
  } catch (error) {
    yield put(createWorkingHoursFormError(error));
  }
}

function* editWorkingHoursForm({
  workingHours,
  onEditSuccess,
  meterType,
  meterId,
}) {
  try {
    let workingHoursForm = {};
    // TODO: separate into two actions -> EDIT_EGG_WORKING_HOURS and EDIT_BRANCH_WORKING_HOURS
    switch (meterType.toLowerCase()) {
      case 'branch':
        workingHoursForm = yield call(
          putRequest,
          `${API_URL}/branch/${meterId}/workingHour/${workingHours.id}`,
          formatData(workingHours)
        );
        break;
      case 'egg':
        workingHoursForm = yield call(
          putRequest,
          `${API_URL}/egg/${meterId}/workingHour/${workingHours.id}`,
          formatData(workingHours)
        );
        break;
    }
    onEditSuccess(workingHoursForm.data);
    yield put(workingHoursEdited(workingHoursForm.data));
  } catch (error) {
    yield put(editWorkingHoursError(error));
  }
}
