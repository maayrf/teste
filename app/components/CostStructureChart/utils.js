import { COST_STRUCTURES_TYPES } from './constants';

export const formatDataToCostStructureChart = ({ costStructureChartValues }) =>
  costStructureChartValues.map(({ type, value }) => ({
    name: COST_STRUCTURES_TYPES[type],
    value,
  }));
