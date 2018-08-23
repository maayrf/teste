import moment from 'moment';

export const formatPerformanceIndexDataToChart = (data) => {
  const dataSource = [];
  const convertDate = (value) => moment(value).format('DD/MM');

  data.forEach((item) => {
    const startDate = convertDate(item.startDate);
    const endDate = convertDate(item.endDate);
    dataSource.push({
      ...item,
      week: `${startDate} ~ ${endDate}`,
      powerConsumptionValue: item.powerConsumption.value,
      powerConsumptionUnit: item.powerConsumption.unit,
      costConsumptionValue: item.costConsumption.value,
      costConsumptionUnit: item.costConsumption.unit,
    });
  });

  return dataSource || [];
};
