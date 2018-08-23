import moment from 'moment';

export const isScaleOf = (value, scale) => value % scale === 0;

export const formatDatesForMinutesScales = (dates, scale) => {
  let initDate = dates[0];
  let endDate = dates[1];
  if (!!initDate && !isScaleOf(initDate.minutes(), scale)) {
    initDate = initDate.minutes(0);
  }
  if (!!endDate && !isScaleOf(endDate.minutes(), scale)) {
    endDate = endDate.minutes(0);
  }
  const diffMinutes = moment.duration(endDate.diff(initDate)).asMinutes();
  if (diffMinutes < scale) {
    // TODO: Method .add is depreceted
    endDate = moment(initDate).add(scale, 'm');
  }
  return [initDate, endDate];
};

const OFFSET_STEP_HOURS = 26;

export const formatDatesByMaxRangeInHours = (initDate, endDate, maxHours) => {
  let newInitDate = initDate.clone();
  let newEndDate = endDate.clone();
  const diffHours = moment.duration(newEndDate.diff(newInitDate)).asHours();
  if (diffHours > maxHours) {
    if (diffHours >= OFFSET_STEP_HOURS) {
      newInitDate = newInitDate.clone().hours(24 - maxHours / 2);
      newEndDate = newEndDate.clone().hours(maxHours / 2);
    } else {
      newEndDate = moment(initDate).add(maxHours, 'h');
    }
  }
  return [newInitDate, newEndDate];
};
