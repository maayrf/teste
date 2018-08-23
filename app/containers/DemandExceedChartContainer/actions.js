import {
  LOAD_DEMAND_EXCEED_CHART_CONTAINERS,
  LOAD_DEMAND_EXCEED_CHART_CONTAINERS_ERROR,
  LOAD_DEMAND_EXCEED_CHART_CONTAINERS_SUCCESS,
} from './constants';

// DEMAND_EXCEED_CHART_CONTAINER LOAD

export function loadDemandExceedChartContainers(params) {
  return {
    type: LOAD_DEMAND_EXCEED_CHART_CONTAINERS,
    params,
  };
}

export function demandExceedChartContainersLoaded(
  powerDemands,
  demandExceed,
  summaries
) {
  return {
    type: LOAD_DEMAND_EXCEED_CHART_CONTAINERS_SUCCESS,
    powerDemands,
    demandExceed,
    summaries,
  };
}

export function loadDemandExceedChartContainersError(error) {
  return {
    type: LOAD_DEMAND_EXCEED_CHART_CONTAINERS_ERROR,
    error,
  };
}
// END DEMAND_EXCEED_CHART_CONTAINER LOAD
