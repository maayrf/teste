import {
  LOAD_PAGINATED_INFO_OF_EGG_WORKING_HOURS,
  LOAD_TOTAL_WORKING_HOURS_OF_EGG_SUCCESS,
  LOAD_PAGINATED_INFO_OF_EGG_WORKING_HOURS_ERROR,
  LOAD_PAGINATED_INFO_OF_EGG_WORKING_HOURS_SUCCESS,
} from './constants';

// WORKING_HOURS_CONTAINER LOAD

export function loadPaginatedInfoOfEggWorkingHours(eggId, params) {
  return {
    type: LOAD_PAGINATED_INFO_OF_EGG_WORKING_HOURS,
    eggId,
    params,
  };
}

export function paginatedInfoOfEggWorkingHoursLoaded(
  workingHours,
  totalCount,
  limit,
  offset
) {
  return {
    type: LOAD_PAGINATED_INFO_OF_EGG_WORKING_HOURS_SUCCESS,
    workingHours,
    totalCount,
    limit,
    offset,
  };
}

export function loadPaginatedInfoOfEggWorkingHoursError(error) {
  return {
    type: LOAD_PAGINATED_INFO_OF_EGG_WORKING_HOURS_ERROR,
    error,
  };
}
