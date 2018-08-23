import {
  LOAD_PERFORMANCE_CONFIGURATIONS,
  LOAD_PERFORMANCE_CONFIGURATIONS_ERROR,
  LOAD_PERFORMANCE_CONFIGURATIONS_SUCCESS,
} from './constants';

// PERFORMANCE_CONFIGURATION LOAD

export function loadPerformanceConfigurations(params) {
  return {
    type: LOAD_PERFORMANCE_CONFIGURATIONS,
    params,
  };
}

export function performanceConfigurationsLoaded(
  performanceConfigurations,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_PERFORMANCE_CONFIGURATIONS_SUCCESS,
    performanceConfigurations,
    totalCount,
    limit,
    offset,
  };
}

export function loadPerformanceConfigurationsError(error) {
  return {
    type: LOAD_PERFORMANCE_CONFIGURATIONS_ERROR,
    error,
  };
}
// END PERFORMANCE_CONFIGURATION LOAD
