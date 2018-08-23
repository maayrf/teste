import { createSelector } from 'reselect';

export const selectRushHours = (state) => state.get('rushHours');

export const makeSelectRushHours = () =>
  createSelector(selectRushHours, (rushHoursState) =>
    rushHoursState.get('rushHours').toJS());

export const makeSelectRushHoursLoading = () =>
  createSelector(selectRushHours, (rushHoursState) =>
    rushHoursState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectRushHours, (rushHoursState) =>
    rushHoursState.get('error'));

export const makeSelectRushHoursFareAndWorkingHoursErrors = () =>
  createSelector(selectRushHours, (rushHoursState) =>
    rushHoursState.get('rushHoursFareAndWorkingHoursErrors').toJS());
