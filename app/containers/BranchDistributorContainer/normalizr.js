import { denormalize, normalize, schema } from 'normalizr';

const branchDistributorSchema = new schema.Entity('branchDistributors');
const branchDistributorListSchema = [branchDistributorSchema];

export const normalizeBranchDistributors = (data) =>
  normalize(data, branchDistributorListSchema);

export const denormalizeBranchDistributors = (data, entities) => {
  const newEntities = entities || { BranchDistributors: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    branchDistributorListSchema,
    newEntities
  );
  return denormalizedData || [];
};
