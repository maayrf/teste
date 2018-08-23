import { createSelector } from 'reselect';

export const selectGroupingForms = (state) => state.get('groupingForm');

export const makeSelectGroupingLoading = () =>
  createSelector(selectGroupingForms, (groupingFormState) =>
    groupingFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectGroupingForms, (groupingFormState) =>
    groupingFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectGroupingForms, (groupingFormState) =>
    groupingFormState.get('success'));
