import {
  LOAD_CURRENT_WORKING_HOURS_OF_EGG,
  LOAD_CURRENT_WORKING_HOURS_OF_EGG_ERROR,
  LOAD_CURRENT_WORKING_HOURS_OF_EGG_SUCCESS,
} from './constants';

export function loadCurrentEggWorkingHours(eggId) {
  return {
    type: LOAD_CURRENT_WORKING_HOURS_OF_EGG,
    eggId,
  };
}

export function currentEggWorkingHoursLoaded(currentEggWorkingHours) {
  return {
    type: LOAD_CURRENT_WORKING_HOURS_OF_EGG_SUCCESS,
    currentEggWorkingHours,
  };
}

export function loadCurrentEggWorkingHoursError(error) {
  return {
    type: LOAD_CURRENT_WORKING_HOURS_OF_EGG_ERROR,
    error,
  };
}
