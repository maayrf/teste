import {
  REMOVE_MACHINE,
  REMOVE_MACHINE_ERROR,
  REMOVE_MACHINE_SUCCESS,
  CREATE_MACHINE,
  CREATE_MACHINE_ERROR,
  CREATE_MACHINE_SUCCESS,
  EDIT_MACHINE,
  EDIT_MACHINE_ERROR,
  EDIT_MACHINE_SUCCESS,
} from './constants';

// CREATE MACHINE_FORM
export function createMachine(machine) {
  return {
    type: CREATE_MACHINE,
    machine,
  };
}

export function createMachineFormError(error) {
  return {
    type: CREATE_MACHINE_ERROR,
    error,
  };
}

export function machineCreated(machine) {
  return {
    type: CREATE_MACHINE_SUCCESS,
    machine,
  };
}
// END CREATE MACHINE_FORM

// EDIT MACHINE_FORM
export function editMachine(machine) {
  return {
    type: EDIT_MACHINE,
    machine,
  };
}

export function editMachineError(error) {
  return {
    type: EDIT_MACHINE_ERROR,
    error,
  };
}

export function machineEdited(machine) {
  return {
    type: EDIT_MACHINE_SUCCESS,
    machine,
  };
}
// END EDIT MACHINE_FORM

// REMOVE MACHINE_FORM
export function removeMachineForm(id) {
  return {
    type: REMOVE_MACHINE,
    id,
  };
}

export function removeMachineError(error) {
  return {
    type: REMOVE_MACHINE_ERROR,
    error,
  };
}

export function machineRemoved(id) {
  return {
    type: REMOVE_MACHINE_SUCCESS,
    id,
  };
}

// END REMOVE MACHINE_FORM
