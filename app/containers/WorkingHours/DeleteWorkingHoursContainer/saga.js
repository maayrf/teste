import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest } from '../../../utils/request';
import { DELETE_WORKING_HOURS } from './constants';
import { workingHoursDeleted, deleteWorkingHoursError } from './actions';
import { API_URL } from '../../../utils/constants';
import openNotificationWithIcon from '../../../utils/antd-notification';

export default function* deleteWorkingHoursData() {
  yield all([takeLatest(DELETE_WORKING_HOURS, removeWorkingHours)]);
}

export function* removeWorkingHours({ workingHours, callback }) {
  try {
    yield call(deleteRequest, `${API_URL}/workingHour/${workingHours.id}`);
    yield put(workingHoursDeleted(workingHours));
    yield call(
      openNotificationWithIcon,
      'success',
      'Quadro de horário deletado!'
    );
    yield callback();
  } catch (error) {
    yield put(deleteWorkingHoursError(workingHours));
    yield call(
      openNotificationWithIcon,
      'error',
      'Falha ao deletar quadro de horário!'
    );
  }
}
