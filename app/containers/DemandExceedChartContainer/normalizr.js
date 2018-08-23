import { denormalize, normalize, schema } from 'normalizr';

const demandExceedChartContainerSchema = new schema.Entity('demandExceedData');
const demandExceedChartContainerListSchema = [demandExceedChartContainerSchema];

export const normalizeDemandExceedChartContainers = (data) =>
  normalize(data, demandExceedChartContainerListSchema);

export const denormalizeDemandExceedChartContainers = (data, entities) => {
  const newEntities = entities || { demandExceedData: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    demandExceedChartContainerListSchema,
    newEntities
  );
  return denormalizedData || [];
};
