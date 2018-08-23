import moment from 'moment';

export const formatToMeterSelectionFilter = ({
  rangeDates: [startDate, endDate],
  selectMetersButton: { checkedMeters },
  scaleVisualization,
}) => {
  const searchBranchesIds = [];
  const searchGroupingsIds = [];
  const searchEggsIds = [];
  for (let i = 0; i < checkedMeters.length; i += 1) {
    const meter = checkedMeters[i];
    switch (meter.className) {
      case 'Branch':
        searchBranchesIds.push(meter.id);
        break;
      case 'Grouping':
        searchGroupingsIds.push(meter.id);
        break;
      case 'Egg':
        searchEggsIds.push(meter.id);
        break;
      default:
        break;
    }
  }
  return {
    searchScale: scaleVisualization,
    searchStartDate: moment(startDate).format('YYYY-MM-DDTHH:MM:SS'),
    searchEndDate: moment(endDate).format('YYYY-MM-DDTHH:MM:SS'),
    searchBranchesIds,
    searchGroupingsIds,
    searchEggsIds,
  };
};
