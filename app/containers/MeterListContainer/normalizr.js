import { denormalize, normalize, schema } from 'normalizr';

const meterSchema = new schema.Entity('meters');
const meterListSchema = [meterSchema];

export const normalizeMeters = (data) => normalize(data, meterListSchema);

export const denormalizeMeters = (data, entities) => {
  const newEntities = entities || { meters: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    meterListSchema,
    newEntities
  );
  return denormalizedData || [];
};
