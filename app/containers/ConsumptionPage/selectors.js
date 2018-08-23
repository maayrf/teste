import { createSelector } from 'reselect';

export const selectConsumptions = (state) => state.get('consumptions');

export const makeSelectConsumptions = () =>
  createSelector(selectConsumptions, (consumptionState) =>
    consumptionState.get('consumptions').toJS());

export const makeSelectConsumptionsLoading = () =>
  createSelector(selectConsumptions, (consumptionState) =>
    consumptionState.get('loading'));

export const makeSelectConsumptionsFareAndWorkingHoursErrors = () =>
  createSelector(selectConsumptions, (consumptionState) =>
    consumptionState.get('consumptionsFareAndWorkingHoursErrors').toJS());
