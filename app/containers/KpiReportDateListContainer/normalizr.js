import { denormalize, normalize, schema } from 'normalizr';

const kpiReportDateSchema = new schema.Entity(
  'kpiReportDates',
  {},
  {
    idAttribute: 'date',
  }
);
const kpiReportDateListSchema = [kpiReportDateSchema];

export const normalizeKpiReportDates = (data) =>
  normalize(data, kpiReportDateListSchema);

export const denormalizeKpiReportDates = (data, entities) => {
  const newEntities = entities || { kpiReportDates: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    kpiReportDateListSchema,
    newEntities
  );
  return denormalizedData || [];
};
