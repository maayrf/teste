import { denormalize, normalize, schema } from 'normalizr';

const pendingMeterSchema = new schema.Entity('pendingMeters');
const pendingMeterListSchema = [pendingMeterSchema];

export const normalizePendingMeters = (data) =>
  normalize(data, pendingMeterListSchema);

export const denormalizePendingMeters = (data, entities) => {
  const newEntities = entities || { pendingMeters: data.toJS() };
  const denormalizedData = denormalize(
    Object.keys(data.toJS()),
    pendingMeterListSchema,
    newEntities
  );
  return denormalizedData || [];
};
