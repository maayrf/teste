import {
  LOAD_PERFORMANCE_INDEX_CHARTS,
  LOAD_PERFORMANCE_INDEX_CHARTS_ERROR,
  LOAD_PERFORMANCE_INDEX_CHARTS_SUCCESS,
} from './constants';

// PERFORMANCE_INDEX_CHART LOAD

export function loadPerformanceIndexCharts(params) {
  return {
    type: LOAD_PERFORMANCE_INDEX_CHARTS,
    params,
  };
}

export function performanceIndexChartsLoaded(performanceIndexCharts) {
  return {
    type: LOAD_PERFORMANCE_INDEX_CHARTS_SUCCESS,
    performanceIndexCharts,
  };
}

export function loadPerformanceIndexChartsError(error) {
  return {
    type: LOAD_PERFORMANCE_INDEX_CHARTS_ERROR,
    error,
  };
}
// END PERFORMANCE_INDEX_CHART LOAD
