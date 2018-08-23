import moment from 'moment';

export const NEXT_INDEX = 0;
export const CURRENT_INDEX = 1;
export const PREVIOUS_INDEX = 2;

export const separateCurrentPreviousNext = (itemsToAnalize) =>
  itemsToAnalize.reduce(
    (beforeArray, currentObject) => {
      let index = null;
      if (isPrevious(currentObject)) {
        index = PREVIOUS_INDEX;
      }
      if (isCurrent(currentObject)) {
        index = CURRENT_INDEX;
      }
      if (isNext(currentObject)) {
        index = NEXT_INDEX;
      }
      beforeArray[index].push(currentObject);
      return beforeArray;
    },
    [[], [], []]
  );

const getToday = () => moment().startOf('day');

const isCurrent = ({ startDate, endDate }) =>
  (!endDate && startDate.isSameOrBefore(getToday())) ||
  getToday().isBetween(moment(startDate), moment(endDate));
const isPrevious = ({ startDate, endDate }) =>
  endDate && getToday() > moment(startDate) && getToday() > moment(endDate);

const isNext = ({ startDate, endDate }) =>
  (!endDate && startDate.isAfter(getToday())) ||
  (getToday() < moment(startDate) && getToday() < moment(endDate));
