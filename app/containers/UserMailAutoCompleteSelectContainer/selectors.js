import { createSelector } from 'reselect';
import { denormalizeUserMailAutoCompletes } from './normalizr';

export const selectUserMailAutoCompletes = (state) => state.get('users');

export const makeSelectUserMailAutoCompletesLoading = () =>
  createSelector(selectUserMailAutoCompletes, (userMailAutoCompleteState) =>
    userMailAutoCompleteState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectUserMailAutoCompletes, (userMailAutoCompleteState) =>
    userMailAutoCompleteState.get('error'));

export const makeSelectUserMailAutoCompletes = () =>
  createSelector(selectUserMailAutoCompletes, (userMailAutoCompleteState) =>
    denormalizeUserMailAutoCompletes(userMailAutoCompleteState.get('users').toJS()));

export const makeSelectLimit = () =>
  createSelector(selectUserMailAutoCompletes, (userMailAutoCompleteState) =>
    userMailAutoCompleteState.get('limit'));

export const makeSelectTotalCount = () =>
  createSelector(selectUserMailAutoCompletes, (userMailAutoCompleteState) =>
    userMailAutoCompleteState.get('totalCount'));
