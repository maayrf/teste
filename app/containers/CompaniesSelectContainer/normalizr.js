import { denormalize, normalize, schema } from 'normalizr';

const companiesMailAutoCompleteSchema = new schema.Entity('companies');
const companiesMailAutoCompleteListSchema = [companiesMailAutoCompleteSchema];

export const normalizeCompanies = (data) =>
  normalize(data, companiesMailAutoCompleteListSchema);

export const denormalizeCompanies = (data, entities) => {
  const newEntities = entities || { companies: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    companiesMailAutoCompleteListSchema,
    newEntities
  );
  return denormalizedData || [];
};
