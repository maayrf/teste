import { generateApplicationIds } from '../../utils/generateApplicationIds';

export const formatDataToDashboardWastePerHourChart = (wastePerHourData) => {
  const dataWithoutResume = [];
  const { productiveHours, unproductiveHours } = wastePerHourData;
  productiveHours.name = 'Horário Produtivo';
  productiveHours.id = 1;

  unproductiveHours.name = 'Horário Não Produtivo';
  unproductiveHours.id = 2;

  dataWithoutResume.push(productiveHours);
  dataWithoutResume.push(unproductiveHours);
  return {
    chartData: generateApplicationIds(dataWithoutResume),
  };
};
