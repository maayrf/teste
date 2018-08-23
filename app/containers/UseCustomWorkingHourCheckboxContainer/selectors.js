import { createSelector } from 'reselect';

export const selectEggForms = (reducerKey = 'useCustomWorkingHourForEgg') => (state) => state.get(reducerKey);

export const makeSelectEggLoading = (reducerKey = 'useCustomWorkingHourForEgg') =>
  createSelector(selectEggForms(reducerKey), (eggFormState) =>
    eggFormState.get('loading'));

export const makeSelectError = (reducerKey = 'useCustomWorkingHourForEgg') =>
  createSelector(selectEggForms(reducerKey), (eggFormState) =>
    eggFormState.get('error'));

export const makeSelectSuccess = (reducerKey = 'useCustomWorkingHourForEgg') =>
  createSelector(selectEggForms(reducerKey), (eggFormState) =>
    eggFormState.get('success'));
