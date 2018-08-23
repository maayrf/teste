import { takeLatest, call, put, all } from 'redux-saga/effects';
import { deleteRequest, putRequest, postRequest } from '../../utils/request';
import { CREATE_MACHINE, EDIT_MACHINE, REMOVE_MACHINE } from './constants';
import {
  createMachineFormError,
  editMachineError,
  machineCreated,
  machineEdited,
  machineRemoved,
  removeMachineError,
} from './actions';
import { API_URL } from '../../utils/constants';

export default function* machineData() {
  yield all([
    takeLatest(CREATE_MACHINE, createMachineForm),
    takeLatest(EDIT_MACHINE, editMachineForm),
    takeLatest(REMOVE_MACHINE, removeMachine),
  ]);
}

export function* createMachineForm({ machine }) {
  try {
    const machineForm = yield call(postRequest, `${API_URL}/machine`, machine);
    yield put(machineCreated(machineForm.data));
  } catch (error) {
    yield put(createMachineFormError(error));
  }
}

export function* editMachineForm({ machine }) {
  try {
    const machineForm = yield call(
      putRequest,
      `${API_URL}/machine/${machine.id}`,
      machine
    );
    yield put(machineEdited(machineForm.data));
  } catch (error) {
    yield put(editMachineError(error));
  }
}

export function* removeMachine({ id }) {
  try {
    yield call(deleteRequest, `${API_URL}/machine/${id}`);
    yield put(machineRemoved(id));
  } catch (error) {
    yield put(removeMachineError(id, error));
  }
}
