import {
  LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID,
  LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID_ERROR,
  LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID_SUCCESS,
} from './constants';

// EggDetailGeneralInformation
export function loadEggDetailGeneralInformationById(id) {
  return {
    type: LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID,
    id,
  };
}

export function loadEggDetailGeneralInformationByIdError(error) {
  return {
    type: LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID_ERROR,
    error,
  };
}

export function eggDetailGeneralInformationByIdLoaded(eggDetailGeneralInformation) {
  return {
    type: LOAD_EGG_DETAIL_GENERAL_INFORMATION_BY_ID_SUCCESS,
    eggDetailGeneralInformation,
  };
}
// END EggDetailGeneralInformation
