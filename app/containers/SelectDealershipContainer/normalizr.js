import { denormalize, normalize, schema } from 'normalizr';

const selectDealershipSchema = new schema.Entity('selectDealerships');
const selectDealershipListSchema = [selectDealershipSchema];

export const normalizeSelectDealerships = (data) =>
  normalize(data, selectDealershipListSchema);

export const denormalizeSelectDealerships = (data, entities) => {
  const newEntities = entities || { selectDealerships: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    selectDealershipListSchema,
    newEntities
  );
  return denormalizedData || [];
};
