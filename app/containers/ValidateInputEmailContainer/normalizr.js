import { denormalize, normalize, schema } from 'normalizr';

const validateInputEmailSchema = new schema.Entity('availableEmail');
const validateInputEmailListSchema = [validateInputEmailSchema];

export const normalizeValidateInputEmails = (data) =>
  normalize(data, validateInputEmailListSchema);

export const denormalizeValidateInputEmails = (data, entities) => {
  const newEntities = entities || { availableEmail: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    validateInputEmailListSchema,
    newEntities
  );
  return denormalizedData || [];
};
