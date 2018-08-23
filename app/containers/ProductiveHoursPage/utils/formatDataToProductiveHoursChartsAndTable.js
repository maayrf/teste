import { generateApplicationIds } from '../../../utils/generateApplicationIds';

export const formatDataToProductiveHoursChartsAndTable = (productiveHoursData) => {
  const dataWithoutTotal = [];
  const { productive, unproductive, total } = productiveHoursData;

  productive.name = 'Horário produtivo';
  productive.id = 1;

  unproductive.name = 'Horário não produtivo';
  unproductive.id = 2;

  total.name = 'Total';
  total.id = -1;
  dataWithoutTotal.push(productive);
  dataWithoutTotal.push(unproductive);
  const dataWithTotal = Object.assign([], dataWithoutTotal);
  dataWithTotal.push(total);
  return {
    chartData: generateApplicationIds(dataWithoutTotal),
    tableData: dataWithTotal,
  };
};
