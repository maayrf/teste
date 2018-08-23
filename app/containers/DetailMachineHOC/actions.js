import {
  LOAD_MACHINE_BY_ID,
  LOAD_MACHINE_BY_ID_ERROR,
  LOAD_MACHINE_BY_ID_SUCCESS,
} from './constants';

// Machine Detail
export function loadMachineById(id) {
  return {
    type: LOAD_MACHINE_BY_ID,
    id,
  };
}

export function loadMachineByIdError(error) {
  return {
    type: LOAD_MACHINE_BY_ID_ERROR,
    error,
  };
}

export function machineByIdLoaded(machine) {
  return {
    type: LOAD_MACHINE_BY_ID_SUCCESS,
    machine,
  };
}
// END Machine Detail
