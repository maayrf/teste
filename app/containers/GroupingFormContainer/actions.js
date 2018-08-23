import {
  REMOVE_GROUPING,
  REMOVE_GROUPING_ERROR,
  REMOVE_GROUPING_SUCCESS,
  CREATE_GROUPING,
  CREATE_GROUPING_ERROR,
  CREATE_GROUPING_SUCCESS,
  EDIT_GROUPING,
  EDIT_GROUPING_ERROR,
  EDIT_GROUPING_SUCCESS,
} from './constants';

// CREATE GROUPING_FORM
export function createGrouping(grouping, resolve) {
  return {
    type: CREATE_GROUPING,
    grouping,
    resolve,
  };
}

export function createGroupingFormError(error) {
  return {
    type: CREATE_GROUPING_ERROR,
    error,
  };
}

export function groupingFormCreated(grouping) {
  return {
    type: CREATE_GROUPING_SUCCESS,
    grouping,
  };
}
// END CREATE GROUPING_FORM

// EDIT GROUPING_FORM
export function editGrouping(grouping) {
  return {
    type: EDIT_GROUPING,
    grouping,
  };
}

export function editGroupingError(error) {
  return {
    type: EDIT_GROUPING_ERROR,
    error,
  };
}

export function groupingEdited(grouping) {
  return {
    type: EDIT_GROUPING_SUCCESS,
    grouping,
  };
}
// END EDIT GROUPING_FORM

// REMOVE GROUPING_FORM
export function removeGroupingForm(id, resolve, eject) {
  return {
    type: REMOVE_GROUPING,
    id,
    resolve,
    eject,
  };
}

export function removeGroupingError(error) {
  return {
    type: REMOVE_GROUPING_ERROR,
    error,
  };
}

export function groupingRemoved(id) {
  return {
    type: REMOVE_GROUPING_SUCCESS,
    id,
  };
}

// END REMOVE GROUPING_FORM
