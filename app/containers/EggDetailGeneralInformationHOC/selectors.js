import { createSelector } from 'reselect';

export const selectEggDetailGeneralInformation = (state) =>
  state.get('eggDetailGeneralInformation');

export const makeSelectLoading = () =>
  createSelector(
    selectEggDetailGeneralInformation,
    (eggDetailGeneralInformationState) =>
      eggDetailGeneralInformationState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectEggDetailGeneralInformation,
    (eggDetailGeneralInformationState) =>
      eggDetailGeneralInformationState.get('error')
  );

export const makeSelectSuccess = () =>
  createSelector(
    selectEggDetailGeneralInformation,
    (eggDetailGeneralInformationState) =>
      eggDetailGeneralInformationState.get('success')
  );
