import {
  LOAD_METER_TREE,
  LOAD_METER_TREE_ERROR,
  LOAD_METER_TREE_SUCCESS,
} from './constants';

// METER_TREE LOAD

export function loadMeterTree(params) {
  return {
    type: LOAD_METER_TREE,
    params,
  };
}

export function meterTreesLoaded(meterTree) {
  return {
    type: LOAD_METER_TREE_SUCCESS,
    meterTree,
  };
}

export function loadMeterTreesError(error) {
  return {
    type: LOAD_METER_TREE_ERROR,
    error,
  };
}
// END METER_TREE LOAD
