import { createSelector } from 'reselect';

export const selectPowerDemand = (state) => state.get('powerDemands');

export const makeSelectPowerDemand = () =>
  createSelector(selectPowerDemand, (powerDemandState) =>
    powerDemandState.get('powerDemands').toJS());

export const makeSelectPowerDemandLoading = () =>
  createSelector(selectPowerDemand, (powerDemandPageState) =>
    powerDemandPageState.get('loading'));
