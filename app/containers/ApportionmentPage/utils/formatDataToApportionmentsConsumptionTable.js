export const formatDataToApportionmentsConsumptionTable = ({
  branchesDistribution,
  groupingsDistribution,
  eggsDistribution,
  total,
}) => {
  const putConsumptionAndNamePropertiesOnFirstLevel = (
    item,
    index,
    nameProperty = 'name'
  ) => ({
    name: item[nameProperty],
    id: item.id,
    consumption: item.consumption.consumption,
    className: item.className,
    consumptionPercentage: item.consumption.consumptionPercentage,
    consumptionUnit: item.consumption.consumptionUnit,
    cost: item.consumption.cost,
    costPercentage: item.consumption.costPercentage,
    costUnit: item.consumption.costUnit,
  });

  const branchValues = branchesDistribution.map((item, index) =>
    putConsumptionAndNamePropertiesOnFirstLevel(item, index, 'tradename'));
  const groupValues = groupingsDistribution.map((item, index) =>
    putConsumptionAndNamePropertiesOnFirstLevel(item, index));
  const eggValues = eggsDistribution.map((item, index) =>
    putConsumptionAndNamePropertiesOnFirstLevel(item, index));

  const newTotal = total;
  newTotal.name = 'Total';
  newTotal.id = -1;

  return [...branchValues, ...groupValues, ...eggValues, newTotal];
};
