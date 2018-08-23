import { createSelector } from 'reselect';

export const selectMachineForm = (state) => state.get('machineForm');

export const makeSelectMachineLoading = () =>
  createSelector(selectMachineForm, (machineFormState) =>
    machineFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectMachineForm, (machineFormState) =>
    machineFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectMachineForm, (machineFormState) =>
    machineFormState.get('success'));
