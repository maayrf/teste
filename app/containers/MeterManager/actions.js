import {
  LOAD_PENDING_METERS,
  LOAD_PENDING_METERS_SUCCESS,
  LOAD_PENDING_METERS_ERROR,
  REMOVE_METER,
  REMOVE_METER_ERROR,
  REMOVE_METER_SUCCESS,
  EDIT_METER_ERROR,
  EDIT_METER_SUCCESS,
  MOVE_METER,
  MOVE_METER_ERROR,
  MOVE_METER_SUCCESS,
} from './constants';

// PENDING METER LIST LOAD

export function loadPendingMeters(params) {
  return {
    type: LOAD_PENDING_METERS,
    params,
  };
}

export function pendingMetersLoaded(pendingMeters) {
  return {
    type: LOAD_PENDING_METERS_SUCCESS,
    pendingMeters,
  };
}

export function loadPendingMetersError(error) {
  return {
    type: LOAD_PENDING_METERS_ERROR,
    error,
  };
}

// EDIT METER
// export function editMeter(meter, resolve, reject) {
//   return {
//     type: EDIT_METER,
//     meter,
//     resolve,
//     reject,
//   };
// }

export function editMeterError(error) {
  return {
    type: EDIT_METER_ERROR,
    error,
  };
}

export function meterEdited(meter) {
  return {
    type: EDIT_METER_SUCCESS,
    meter,
  };
}
// END EDIT METER

// REMOVE METER
export function removeMeter(id) {
  return {
    type: REMOVE_METER,
    id,
  };
}

export function removeMeterError(error) {
  return {
    type: REMOVE_METER_ERROR,
    error,
  };
}

export function meterRemoved(id) {
  return {
    type: REMOVE_METER_SUCCESS,
    id,
  };
}

// END REMOVE METER
export function moveMeter(meter, parent, resolve, reject) {
  return {
    type: MOVE_METER,
    meter,
    parent,
    resolve,
    reject,
  };
}

export function moveMeterError(error) {
  return {
    type: MOVE_METER_ERROR,
    error,
  };
}

export function meterMoved(meter) {
  return {
    type: MOVE_METER_SUCCESS,
    meter,
  };
}
