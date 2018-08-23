import {
  LOAD_METER_NETWORK_CONFIGURATIONS,
  LOAD_METER_NETWORK_CONFIGURATIONS_ERROR,
  LOAD_METER_NETWORK_CONFIGURATIONS_SUCCESS,
} from './constants';

// METER_NETWORK_CONFIGURATION LOAD

export function loadMeterNetworkConfigurations(params, meterId) {
  return {
    type: LOAD_METER_NETWORK_CONFIGURATIONS,
    params,
    meterId,
  };
}

export function meterNetworkConfigurationsLoaded(
  meterNetworkConfigurations,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_METER_NETWORK_CONFIGURATIONS_SUCCESS,
    meterNetworkConfigurations,
    totalCount,
    limit,
    offset,
  };
}

export function loadMeterNetworkConfigurationsError(error) {
  return {
    type: LOAD_METER_NETWORK_CONFIGURATIONS_ERROR,
    error,
  };
}
// END METER_NETWORK_CONFIGURATION LOAD
