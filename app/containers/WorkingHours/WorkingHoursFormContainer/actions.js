import {
  CREATE_WORKING_HOURS,
  CREATE_WORKING_HOURS_ERROR,
  CREATE_WORKING_HOURS_SUCCESS,
  EDIT_WORKING_HOURS,
  EDIT_WORKING_HOURS_ERROR,
  EDIT_WORKING_HOURS_SUCCESS,
} from './constants';

// CREATE WORKING_HOURS_FORM
export function createWorkingHours(
  workingHours,
  onCreateSuccess,
  meterType,
  meterId
) {
  return {
    type: CREATE_WORKING_HOURS,
    workingHours,
    onCreateSuccess,
    meterType,
    meterId,
  };
}

export function createWorkingHoursFormError(error) {
  return {
    type: CREATE_WORKING_HOURS_ERROR,
    error,
  };
}

export function workingHoursFormCreated(workingHours) {
  return {
    type: CREATE_WORKING_HOURS_SUCCESS,
    workingHours,
  };
}
// END CREATE WORKING_HOURS_FORM

// EDIT WORKING_HOURS_FORM
export function editWorkingHours(
  workingHours,
  onEditSuccess,
  meterType,
  meterId
) {
  return {
    type: EDIT_WORKING_HOURS,
    workingHours,
    onEditSuccess,
    meterType,
    meterId,
  };
}

export function editWorkingHoursError(error) {
  return {
    type: EDIT_WORKING_HOURS_ERROR,
    error,
  };
}

export function workingHoursEdited(workingHours) {
  return {
    type: EDIT_WORKING_HOURS_SUCCESS,
    workingHours,
  };
}
// END EDIT WORKING_HOURS_FORM
