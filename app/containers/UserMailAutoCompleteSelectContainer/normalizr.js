import { denormalize, normalize, schema } from 'normalizr';

const userMailAutoCompleteSchema = new schema.Entity('userMailAutoCompletes');
const userMailAutoCompleteListSchema = [userMailAutoCompleteSchema];

export const normalizeUserMailAutoCompletes = (data) =>
  normalize(data, userMailAutoCompleteListSchema);

export const denormalizeUserMailAutoCompletes = (data, entities) => {
  const newEntities = entities || { userMailAutoCompletes: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    userMailAutoCompleteListSchema,
    newEntities
  );
  return denormalizedData || [];
};
