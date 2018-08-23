import {
  LOAD_POWER_DEMAND,
  LOAD_POWER_DEMAND_ERROR,
  LOAD_POWER_DEMAND_SUCCESS,
} from './constants';

export function loadPowerDemand(params) {
  return {
    type: LOAD_POWER_DEMAND,
    params,
  };
}

export function powerDemandPagesLoaded(powerDemands) {
  return {
    type: LOAD_POWER_DEMAND_SUCCESS,
    powerDemands,
  };
}

export function loadPowerDemandPagesError(error) {
  return {
    type: LOAD_POWER_DEMAND_ERROR,
    error,
  };
}
