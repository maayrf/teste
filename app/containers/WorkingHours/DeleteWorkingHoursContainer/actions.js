import {
  DELETE_WORKING_HOURS,
  DELETE_WORKING_HOURS_ERROR,
  DELETE_WORKING_HOURS_SUCCESS,
} from './constants';

export function deleteWorkingHours(workingHours, callback) {
  return {
    type: DELETE_WORKING_HOURS,
    workingHours,
    callback,
  };
}

export function deleteWorkingHoursError(workingHours) {
  return {
    type: DELETE_WORKING_HOURS_ERROR,
    workingHours,
  };
}

export function workingHoursDeleted(workingHours) {
  return {
    type: DELETE_WORKING_HOURS_SUCCESS,
    workingHours,
  };
}
