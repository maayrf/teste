import { createSelector } from 'reselect';

export const selectProductiveHours = (state) => state.get('productiveHours');

export const makeSelectProductiveHours = () =>
  createSelector(selectProductiveHours, (productiveHoursState) =>
    productiveHoursState.get('productiveHours').toJS());

export const makeSelectProductiveHoursLoading = () =>
  createSelector(selectProductiveHours, (productiveHoursState) =>
    productiveHoursState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectProductiveHours, (productiveHoursState) =>
    productiveHoursState.get('error'));

export const makeSelectProductiveHoursFareAndWorkingHoursErrors = () =>
  createSelector(selectProductiveHours, (productiveHoursState) =>
    productiveHoursState.get('productiveHoursFareAndWorkingHoursErrors').toJS());
