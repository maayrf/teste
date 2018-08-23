import { denormalize, normalize, schema } from 'normalizr';

const myPerformanceIndexSchema = new schema.Entity('myPerformanceIndex');
const myPerformanceIndexListSchema = [myPerformanceIndexSchema];

export const normalizeMyPerformanceIndexs = (data) =>
  normalize(data, myPerformanceIndexListSchema);

export const denormalizeMyPerformanceIndexs = (data, entities) => {
  const newEntities = entities || { myPerformanceIndex: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    myPerformanceIndexListSchema,
    newEntities
  );
  return denormalizedData || [];
};
