import { createSelector } from 'reselect';

export const selectEggForms = (reducerKey = 'eggForm') => (state) =>
  state.get(reducerKey);

export const makeSelectEggLoading = (reducerKey = 'eggForm') =>
  createSelector(selectEggForms(reducerKey), (eggFormState) =>
    eggFormState.get('loading'));

export const makeSelectError = (reducerKey = 'eggForm') =>
  createSelector(selectEggForms(reducerKey), (eggFormState) =>
    eggFormState.get('error'));

export const makeSelectSuccess = (reducerKey = 'eggForm') =>
  createSelector(selectEggForms(reducerKey), (eggFormState) =>
    eggFormState.get('success'));
