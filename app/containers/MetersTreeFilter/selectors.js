import { createSelector } from 'reselect';
import {
  getSelectedMetersAndIgnoreChildrenWhenIsChecked,
  isFilterReady,
} from './utils';

export const selectMetersTreeFilter = (state) => state.get('metersTreeFilter');

export const makeSelectMetersLoading = () =>
  createSelector(selectMetersTreeFilter, (metersTreeFilterState) =>
    metersTreeFilterState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectMetersTreeFilter, (metersTreeFilterState) =>
    metersTreeFilterState.get('error'));

export const makeSelectMeters = () =>
  createSelector(selectMetersTreeFilter, (metersTreeFilterState) =>
    metersTreeFilterState.get('meters').toJS());

export const makeSelectMetersFilter = () =>
  createSelector(selectMetersTreeFilter, (metersTreeFilterState) =>
    metersTreeFilterState.get('filter').toJS());

export const makeSelectCheckedMeters = () =>
  createSelector(selectMetersTreeFilter, (metersTreeFilterState) =>
    metersTreeFilterState.get('checkedMeters').toJS());

export const makeSelectSelectedMeters = () =>
  createSelector(selectMetersTreeFilter, (metersTreeFilterState) => {
    const branches = metersTreeFilterState.get('meters').toJS();
    const checkedMeters = metersTreeFilterState.get('checkedMeters').toJS();
    return getSelectedMetersAndIgnoreChildrenWhenIsChecked(
      branches,
      checkedMeters
    );
  });

export const makeSelectIsFilterReady = () =>
  createSelector(selectMetersTreeFilter, (metersTreeFilterState) => {
    const branches = metersTreeFilterState.get('meters').toJS();
    const checkedMeters = metersTreeFilterState.get('checkedMeters').toJS();
    const filter = metersTreeFilterState.get('filter').toJS();
    const selectedMeters = getSelectedMetersAndIgnoreChildrenWhenIsChecked(
      branches,
      checkedMeters
    );
    return isFilterReady(selectedMeters, filter);
  });

export const makeSelectSelectedMeter = () =>
  createSelector(selectMetersTreeFilter, (metersTreeFilterState) => {
    const selectedMeter = metersTreeFilterState.get('selectedMeter');
    const meters = metersTreeFilterState.get('meters').toJS();
    if (meters && meters.length && selectedMeter && selectedMeter.id) {
      return selectMeter(meters, selectedMeter);
    }
    return null;
  });

const selectMeter = (meters, selectedMeter) => {
  switch (selectedMeter.className) {
    case 'egg':
      return findEggInMeterList(meters, selectedMeter.id);
    case 'grouping':
      return findGroupingInMetersList(meters, selectedMeter.id);
    case 'branch':
      return findBranch(meters, selectedMeter.id);
    default:
      return null;
  }
};

// in this case a meter can be a grouping or a the first level of a branch JSON
const findEggInMeter = (meter, eggId) => {
  let foundEgg = null;
  if (meter.eggs) {
    foundEgg = meter.eggs.find((egg) => egg.id === eggId);
  }
  if (!foundEgg && (meter.groupings && meter.groupings.length)) {
    foundEgg = findEggInMeterList(meter.groupings, eggId);
  }
  return foundEgg;
};

const findEggInMeterList = (metersList, eggId) => {
  let foundEgg = null;
  for (const meter of metersList) {
    foundEgg = findEggInMeter(meter, eggId);
    if (foundEgg) return foundEgg;
  }
  return foundEgg;
};

const findGroupingInMetersList = (metersList, groupingId) => {
  let foundGrouping = null;

  metersList.forEach((branch) => {
    if (branch.groupings && branch.groupings.length) {
      foundGrouping = findGrouping(branch.groupings, groupingId);
    }
    if (foundGrouping) return foundGrouping;
    return foundGrouping;
  });
  return foundGrouping;
};

const findGrouping = (metersList, groupingId) => {
  let foundGrouping = null;
  metersList.forEach((grouping) => {
    if (grouping.id === groupingId) {
      foundGrouping = grouping;
    }
    if (foundGrouping) return foundGrouping;
    if (grouping.groupings) {
      foundGrouping = findGrouping(grouping.groupings, groupingId);
    }
    if (foundGrouping) return foundGrouping;
    return foundGrouping;
  });
  return foundGrouping;
};

const findBranch = (metersList, branchId) => {
  let foundBranch = null;
  for (const meter of metersList) {
    if (meter.id === branchId) return (foundBranch = meter);
  }
  return foundBranch;
};
