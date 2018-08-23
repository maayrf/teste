// TODO: Remove mock in consts
import { generateApplicationIds } from '../../../../../utils/generateApplicationIds';

export const formatApportionmentConsumptionCharts = ({
  branchesDistribution,
  groupingsDistribution,
  eggsDistribution,
}) => {
  const callbackCreate = (type, nameProperty = 'name') => (_obj) => ({
    type,
    name: _obj[nameProperty],
    consumptionPercentage: _obj.consumption.consumptionPercentage,
    consumption: _obj.consumption.consumption,
    cost: _obj.consumption.cost,
    consumptionUnit: _obj.consumption.consumptionUnit,
    costUnit: _obj.consumption.costUnit,
    costPercentage: _obj.consumption.costPercentage,
    id: _obj.id, // TODO: check if can exist repeated ids and maybe generate all of them from this code
  });

  const branchDistributionValues = branchesDistribution.map(callbackCreate('branchesDistribution', 'tradename'));
  const groupingsDistributionValues = groupingsDistribution.map(callbackCreate('groupingsDistribution'));
  const eggsDistributionValues = eggsDistribution.map(callbackCreate('eggsDistribution'));

  let result = [
    ...branchDistributionValues,
    ...groupingsDistributionValues,
    ...eggsDistributionValues,
  ];

  result = generateApplicationIds(result);
  return result;
};
