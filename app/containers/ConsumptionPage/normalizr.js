import { normalize, schema } from 'normalizr';

const consumptionPageSchema = new schema.Entity('consumptionPages');
const consumptionPageListSchema = [consumptionPageSchema];

const normalizeConsumptionPages = (data) =>
  normalize(data, consumptionPageListSchema);

export default normalizeConsumptionPages;
