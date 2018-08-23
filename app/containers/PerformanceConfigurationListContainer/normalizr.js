import { denormalize, normalize, schema } from 'normalizr';

const performanceConfigurationSchema = new schema.Entity('performanceConfigurations');
const performanceConfigurationListSchema = [performanceConfigurationSchema];

export const normalizePerformanceConfigurations = (data) =>
  normalize(data, performanceConfigurationListSchema);

export const denormalizePerformanceConfigurations = (data, entities) => {
  const newEntities = entities || { performanceConfigurations: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    performanceConfigurationListSchema,
    newEntities
  );
  return denormalizedData || [];
};
