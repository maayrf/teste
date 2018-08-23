import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { API_URL } from '../../utils/constants';
import { LOAD_MACHINE_BY_ID } from './constants';
import { loadMachineByIdError, machineByIdLoaded } from './actions';

export default function* eggData() {
  yield all([takeLatest(LOAD_MACHINE_BY_ID, loadMachineById)]);
}

export function* loadMachineById({ id }) {
  try {
    const machine = yield call(getRequest, `${API_URL}/machine/${id}`);
    yield put(machineByIdLoaded(machine.data));
  } catch (error) {
    yield put(loadMachineByIdError(error));
  }
}
