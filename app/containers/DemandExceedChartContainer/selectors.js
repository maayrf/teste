import { createSelector } from 'reselect';

export const selectDemandExceedChartContainers = (state) =>
  state.get('demandExceedData');

export const makeSelectDemandExceedChartLoading = () =>
  createSelector(
    selectDemandExceedChartContainers,
    (demandExceedChartContainerState) =>
      demandExceedChartContainerState.get('loading')
  );

export const makeSelectError = () =>
  createSelector(
    selectDemandExceedChartContainers,
    (demandExceedChartContainerState) =>
      demandExceedChartContainerState.get('error')
  );

export const makeSelectPowerDemands = () =>
  createSelector(selectDemandExceedChartContainers, (demandExceedChartState) =>
    demandExceedChartState.get('powerDemands').toJS());

export const makeSelectDemandExceed = () =>
  createSelector(selectDemandExceedChartContainers, (demandExceedChartState) =>
    demandExceedChartState.get('demandExceed').toJS());

export const makeSelectSummaries = () =>
  createSelector(selectDemandExceedChartContainers, (demandExceedChartState) =>
    demandExceedChartState.get('summaries').toJS());
