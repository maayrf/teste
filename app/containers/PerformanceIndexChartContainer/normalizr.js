import { denormalize, normalize, schema } from 'normalizr';

const performanceIndexChartSchema = new schema.Entity('performanceIndexCharts');
const performanceIndexChartListSchema = [performanceIndexChartSchema];

export const normalizePerformanceIndexCharts = (data) =>
  normalize(data, performanceIndexChartListSchema);

export const denormalizePerformanceIndexCharts = (data, entities) => {
  const newEntities = entities || { performanceIndexCharts: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    performanceIndexChartListSchema,
    newEntities
  );
  return denormalizedData || [];
};
