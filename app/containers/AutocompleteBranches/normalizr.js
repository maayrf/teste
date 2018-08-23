import { denormalize, normalize, schema } from 'normalizr';

const autocompleteBranchesSchema = new schema.Entity('listBranches');
const autocompleteBranchesListSchema = [autocompleteBranchesSchema];

export const normalizeAutocompleteBranchess = (data) =>
  normalize(data, autocompleteBranchesListSchema);

export const denormalizeAutocompleteBranchess = (data, entities) => {
  const newEntities = entities || { listBranches: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    autocompleteBranchesListSchema,
    newEntities
  );
  return denormalizedData || [];
};
