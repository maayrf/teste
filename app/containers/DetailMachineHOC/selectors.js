import { createSelector } from 'reselect';

export const selectMachineDetail = (REDUCER_KEY = 'machineDetail') => (state) =>
  state.get(REDUCER_KEY);

export const makeSelectLoading = (REDUCER_KEY) =>
  createSelector(selectMachineDetail(REDUCER_KEY), (machineDetailState) =>
    machineDetailState.get('loading'));

export const makeSelectError = (REDUCER_KEY) =>
  createSelector(selectMachineDetail(REDUCER_KEY), (machineDetailState) =>
    machineDetailState.get('error'));

export const makeSelectSuccess = (REDUCER_KEY) =>
  createSelector(selectMachineDetail(REDUCER_KEY), (machineDetailState) =>
    machineDetailState.get('success'));
