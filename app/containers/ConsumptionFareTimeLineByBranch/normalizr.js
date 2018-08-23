import { denormalize, normalize, schema } from 'normalizr';
import moment from 'moment';

const consumptionFareSchema = new schema.Entity('consumptionFares');
const consumptionFareListSchema = [consumptionFareSchema];

export const normalizeConsumptionFares = (consumptionFares) => {
  const newConsumptionFares = consumptionFares.map((consumptionFare) => ({
    ...consumptionFare,
    startDate: moment(consumptionFare.startDate),
    endDate: moment(consumptionFare.endDate),
    rushStartTime: moment(consumptionFare.rushStartTime, 'HH:mm'),
    rushEndTime: moment(consumptionFare.rushEndTime, 'HH:mm'),
  }));
  return normalize(newConsumptionFares, consumptionFareListSchema);
};

export const denormalizeConsumptionFares = (data, entities) => {
  const newEntities = entities || { consumptionFares: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    consumptionFareListSchema,
    newEntities
  );
  return denormalizedData || [];
};
