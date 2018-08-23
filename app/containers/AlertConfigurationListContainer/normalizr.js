import { denormalize, normalize, schema } from 'normalizr';

const alertConfigurationSchema = new schema.Entity('alertConfigurations');
const alertConfigurationListSchema = [alertConfigurationSchema];

export const normalizeAlertConfigurations = (data) =>
  normalize(data, alertConfigurationListSchema);

export const denormalizeAlertConfigurations = (data, entities) => {
  const newEntities = entities || { alertConfigurations: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    alertConfigurationListSchema,
    newEntities
  );
  return denormalizedData || [];
};
