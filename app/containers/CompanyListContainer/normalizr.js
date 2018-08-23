import { denormalize, normalize, schema } from 'normalizr';

const companySchema = new schema.Entity('companies');
const companyListSchema = [companySchema];

export const normalizeCompanies = (data) => normalize(data, companyListSchema);

export const denormalizeCompanys = (data, entities) => {
  const newEntities = entities || { companies: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    companyListSchema,
    newEntities
  );
  return denormalizedData || [];
};
