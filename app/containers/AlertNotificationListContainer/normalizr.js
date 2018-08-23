import { denormalize, normalize, schema } from 'normalizr';

const alertNotificationSchema = new schema.Entity('alertNotifications');
const alertNotificationListSchema = [alertNotificationSchema];

export const normalizeAlertNotifications = (data) =>
  normalize(data, alertNotificationListSchema);

export const denormalizeAlertNotifications = (data, entities) => {
  const newEntities = entities || { alertNotifications: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    alertNotificationListSchema,
    newEntities
  );
  return denormalizedData || [];
};
