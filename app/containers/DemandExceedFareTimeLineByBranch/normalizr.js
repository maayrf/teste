import { denormalize, normalize, schema } from 'normalizr';
import moment from 'moment';

const demandExceedFareSchema = new schema.Entity('demandExceedFares');
const demandExceedFareListSchema = [demandExceedFareSchema];

export const normalizeDemandExceedFares = (demandExceedFares) => {
  const newDemandExceedFares = demandExceedFares.map((demandExceedFare) => ({
    ...demandExceedFare,
    startDate: moment(demandExceedFare.startDate),
    endDate: moment(demandExceedFare.endDate),
    rushStartTime: moment(demandExceedFare.rushStartTime, 'HH:mm'),
    rushEndTime: moment(demandExceedFare.rushEndTime, 'HH:mm'),
  }));
  return normalize(newDemandExceedFares, demandExceedFareListSchema);
};

export const denormalizeDemandExceedFares = (data, entities) => {
  const newEntities = entities || { demandExceedFares: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    demandExceedFareListSchema,
    newEntities
  );
  return denormalizedData || [];
};
