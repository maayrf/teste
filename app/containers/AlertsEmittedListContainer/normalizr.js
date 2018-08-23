import { denormalize, normalize, schema } from 'normalizr';

const alertsEmittedSchema = new schema.Entity('alertsEmitted');
const alertsEmittedListSchema = [alertsEmittedSchema];

export const normalizeAlertsEmitted = (data) =>
  normalize(data, alertsEmittedListSchema);

export const denormalizeAlertsEmitted = (data, entities) => {
  const newEntities = entities || { alertsEmitted: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    alertsEmittedListSchema,
    newEntities
  );
  return denormalizedData || [];
};
