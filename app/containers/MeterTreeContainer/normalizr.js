import { denormalize, normalize, schema } from 'normalizr';

const meterTreeSchema = new schema.Entity('meterTrees');
const meterTreeListSchema = [meterTreeSchema];

export const normalizeMeterTrees = (data) =>
  normalize(data, meterTreeListSchema);

export const denormalizeMeterTrees = (data, entities) => {
  const newEntities = entities || { meterTrees: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    meterTreeListSchema,
    newEntities
  );
  return denormalizedData || [];
};
