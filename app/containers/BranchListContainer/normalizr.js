import { denormalize, normalize, schema } from 'normalizr';

const branchSchema = new schema.Entity('branches');
const branchListSchema = [branchSchema];

export const normalizeBranches = (data) => normalize(data, branchListSchema);

export const denormalizeBranches = (data, entities) => {
  const newEntities = entities || { branches: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    branchListSchema,
    newEntities
  );
  return denormalizedData || [];
};
