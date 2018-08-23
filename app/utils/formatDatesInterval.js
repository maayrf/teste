import moment from 'moment';

export const formatDateInterval = (itemsList) => {
  const newItemsList = itemsList.map((item) => {
    const hours =
      item.rushStartTime && item.rushEndTime
        ? {
          rushStartTime: moment(item.rushStartTime, 'HH:mm'),
          rushEndTime: moment(item.rushEndTime, 'HH:mm'),
        }
        : null;
    return {
      ...item,
      ...hours,
      startDate: moment(item.startDate),
      endDate: item.endDate ? moment(item.endDate) : null,
    };
  });
  return newItemsList;
};
