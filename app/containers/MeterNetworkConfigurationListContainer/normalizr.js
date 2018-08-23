import { denormalize, normalize, schema } from 'normalizr';

const meterNetworkConfigurationSchema = new schema.Entity('meterNetworkConfigurations');
const meterNetworkConfigurationListSchema = [meterNetworkConfigurationSchema];

export const normalizeMeterNetworkConfigurations = (data) =>
  normalize(data, meterNetworkConfigurationListSchema);

export const denormalizeMeterNetworkConfigurations = (data, entities) => {
  const newEntities = entities || { meterNetworkConfigurations: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    meterNetworkConfigurationListSchema,
    newEntities
  );
  return denormalizedData || [];
};
