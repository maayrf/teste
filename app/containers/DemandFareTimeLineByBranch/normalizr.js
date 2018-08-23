import { denormalize, normalize, schema } from 'normalizr';
import moment from 'moment';

const demandFareSchema = new schema.Entity('demandFares');
const demandFareListSchema = [demandFareSchema];

export const normalizeDemandFaresByBranch = (demandFares) => {
  const newDemandFares = demandFares.map((demandFare) => ({
    ...demandFare,
    startDate: moment(demandFare.startDate),
    endDate: moment(demandFare.endDate),
    rushStartTime: moment(demandFare.rushStartTime, 'HH:mm'),
    rushEndTime: moment(demandFare.rushEndTime, 'HH:mm'),
  }));
  return normalize(newDemandFares, demandFareListSchema);
};

export const denormalizeDemandFares = (data, entities) => {
  const newEntities = entities || { demandFares: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    demandFareListSchema,
    newEntities
  );
  return denormalizedData || [];
};
