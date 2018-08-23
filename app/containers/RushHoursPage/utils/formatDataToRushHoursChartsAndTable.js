import { generateApplicationIds } from '../../../utils/generateApplicationIds';

export const formatDataToRushHoursChartsAndTable = (productiveHoursData) => {
  const dataWithoutTotal = [];
  const { rush, outrush, total } = productiveHoursData;

  rush.name = 'Horário de ponta';
  rush.id = 1;

  outrush.name = 'Horário fora de ponta';
  outrush.id = 2;

  total.name = 'Total';
  total.id = -1;
  dataWithoutTotal.push(rush);
  dataWithoutTotal.push(outrush);
  const dataWithTotal = Object.assign([], dataWithoutTotal);
  dataWithTotal.push(total);
  return {
    chartData: generateApplicationIds(dataWithoutTotal),
    tableData: dataWithTotal,
  };
};
