import {
  REMOVE_METER_NETWORK,
  REMOVE_METER_NETWORK_ERROR,
  REMOVE_METER_NETWORK_SUCCESS,
  CREATE_METER_NETWORK,
  CREATE_METER_NETWORK_ERROR,
  CREATE_METER_NETWORK_SUCCESS,
  EDIT_METER_NETWORK,
  EDIT_METER_NETWORK_ERROR,
  EDIT_METER_NETWORK_SUCCESS,
} from './constants';

// CREATE METER_NETWORK_FORM
export function createMeterNetwork(meterNetwork, meterId) {
  return {
    type: CREATE_METER_NETWORK,
    meterNetwork,
    meterId,
  };
}

export function createMeterNetworkFormError(error) {
  return {
    type: CREATE_METER_NETWORK_ERROR,
    error,
  };
}

export function meterNetworkCreated(meterNetwork) {
  return {
    type: CREATE_METER_NETWORK_SUCCESS,
    meterNetwork,
  };
}
// END CREATE METER_NETWORK_FORM

// EDIT METER_NETWORK_FORM
export function editMeterNetwork(meterNetwork, meterId) {
  return {
    type: EDIT_METER_NETWORK,
    meterNetwork,
    meterId,
  };
}

export function editMeterNetworkError(error) {
  return {
    type: EDIT_METER_NETWORK_ERROR,
    error,
  };
}

export function meterNetworkEdited(meterNetwork) {
  return {
    type: EDIT_METER_NETWORK_SUCCESS,
    meterNetwork,
  };
}
// END EDIT METER_NETWORK_FORM

// REMOVE METER_NETWORK_FORM
export function removeMeterNetworkForm(id) {
  return {
    type: REMOVE_METER_NETWORK,
    id,
  };
}

export function removeMeterNetworkError(error) {
  return {
    type: REMOVE_METER_NETWORK_ERROR,
    error,
  };
}

export function meterNetworkRemoved(id) {
  return {
    type: REMOVE_METER_NETWORK_SUCCESS,
    id,
  };
}

// END REMOVE METER_NETWORK_FORM
