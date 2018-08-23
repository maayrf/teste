import { normalize, schema } from 'normalizr';

const companyDetailSchema = new schema.Entity('branchDetails');
const companyDetailListSchema = [companyDetailSchema];

const normalizeCompanyDetails = (data) =>
  normalize(data, companyDetailListSchema);

export default normalizeCompanyDetails;
