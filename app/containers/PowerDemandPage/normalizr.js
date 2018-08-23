import { normalize, schema } from 'normalizr';

const powerDemandPageSchema = new schema.Entity('powerDemandPages');
const powerDemandPageListSchema = [powerDemandPageSchema];

const normalizePowerDemandPages = (data) =>
  normalize(data, powerDemandPageListSchema);

export default normalizePowerDemandPages;
