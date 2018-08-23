import {
  LOAD_MY_PERFORMANCE_INDEXS,
  LOAD_MY_PERFORMANCE_INDEXS_ERROR,
  LOAD_MY_PERFORMANCE_INDEXS_SUCCESS,
  REMOVE_MY_PERFORMANCE_INDEX,
  REMOVE_MY_PERFORMANCE_INDEX_ERROR,
  REMOVE_MY_PERFORMANCE_INDEX_SUCCESS,
  CREATE_MY_PERFORMANCE_INDEX,
  CREATE_MY_PERFORMANCE_INDEX_ERROR,
  CREATE_MY_PERFORMANCE_INDEX_SUCCESS,
  EDIT_MY_PERFORMANCE_INDEX,
  EDIT_MY_PERFORMANCE_INDEX_ERROR,
  EDIT_MY_PERFORMANCE_INDEX_SUCCESS,
} from './constants';

// MY_PERFORMANCE_INDEX LOAD

export function loadMyPerformanceIndexes() {
  return {
    type: LOAD_MY_PERFORMANCE_INDEXS,
  };
}

export function myPerformanceIndexsLoaded(myPerformanceIndexs) {
  return {
    type: LOAD_MY_PERFORMANCE_INDEXS_SUCCESS,
    myPerformanceIndexs,
  };
}

export function loadMyPerformanceIndexsError(error) {
  return {
    type: LOAD_MY_PERFORMANCE_INDEXS_ERROR,
    error,
  };
}
// END MY_PERFORMANCE_INDEX LOAD

// CREATE MY_PERFORMANCE_INDEX
export function createMyPerformanceIndex(myPerformanceIndex, resolve, reject) {
  return {
    type: CREATE_MY_PERFORMANCE_INDEX,
    myPerformanceIndex,
    resolve,
    reject,
  };
}

export function createMyPerformanceIndexError(error) {
  return {
    type: CREATE_MY_PERFORMANCE_INDEX_ERROR,
    error,
  };
}

export function myPerformanceIndexCreated(myPerformanceIndex) {
  return {
    type: CREATE_MY_PERFORMANCE_INDEX_SUCCESS,
    myPerformanceIndex,
  };
}
// END CREATE MY_PERFORMANCE_INDEX

// EDIT MY_PERFORMANCE_INDEX
export function editMyPerformanceIndex(myPerformanceIndex, resolve, reject) {
  return {
    type: EDIT_MY_PERFORMANCE_INDEX,
    myPerformanceIndex,
    resolve,
    reject,
  };
}

export function editMyPerformanceIndexError(error) {
  return {
    type: EDIT_MY_PERFORMANCE_INDEX_ERROR,
    error,
  };
}

export function myPerformanceIndexEdited(myPerformanceIndex) {
  return {
    type: EDIT_MY_PERFORMANCE_INDEX_SUCCESS,
    myPerformanceIndex,
  };
}
// END EDIT MY_PERFORMANCE_INDEX

// REMOVE MY_PERFORMANCE_INDEX
export function removeMyPerformanceIndex(id) {
  return {
    type: REMOVE_MY_PERFORMANCE_INDEX,
    id,
  };
}

export function removeMyPerformanceIndexError(error) {
  return {
    type: REMOVE_MY_PERFORMANCE_INDEX_ERROR,
    error,
  };
}

export function myPerformanceIndexRemoved(id) {
  return {
    type: REMOVE_MY_PERFORMANCE_INDEX_SUCCESS,
    id,
  };
}

// END REMOVE MY_PERFORMANCE_INDEX
