import { denormalize, normalize, schema } from 'normalizr';

const reportSchema = new schema.Entity('report');
const reportListSchema = [reportSchema];

export const normalizeReports = (data) => normalize(data, reportListSchema);

export const denormalizeReports = (data, entities) => {
  const newEntities = entities || { report: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    reportListSchema,
    newEntities
  );
  return denormalizedData || [];
};
