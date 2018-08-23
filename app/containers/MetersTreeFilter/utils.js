/*
 * Used to generate Key for meter, that concat the type with id because, that solve
 * problem of duplicated keys, because we have 3 entities (branch, grouping, egg)
 */
export const generateKeyForMeter = (meter, type) => `${type}-${meter.id}`;

export const meterIsChecked = (meter, checkedMeters, type) =>
  checkedMeters.indexOf(`${type}-${meter.id}`) !== -1;

export const getSelectedMetersAndIgnoreChildrenWhenIsChecked = (
  metersList,
  checkedMeters,
  type = 'branch'
) => {
  let selectedMeters = [];
  for (let i = 0; i < metersList.length; i += 1) {
    const meter = metersList[i];
    if (!meterIsChecked(meter, checkedMeters, type)) {
      let groupings = [];
      let eggs = [];
      if (meter.groupings && meter.groupings.length) {
        groupings = getSelectedMetersAndIgnoreChildrenWhenIsChecked(
          meter.groupings,
          checkedMeters,
          'grouping'
        );
      }
      if (meter.eggs && meter.eggs.length) {
        eggs = getSelectedMetersAndIgnoreChildrenWhenIsChecked(
          meter.eggs,
          checkedMeters,
          'egg'
        );
      }
      selectedMeters = [...selectedMeters, ...groupings, ...eggs];
    } else {
      selectedMeters.push(meter);
    }
  }
  return selectedMeters;
};

export const getCompanyById = (selectedCompany, companyList) =>
  companyList.find((company) => company.id === selectedCompany);

export const hasCompanyAtList = (companies) => !!companies.length;

export const isFilterReady = (meterFilterTreeValue) => {
  if (!meterFilterTreeValue) {
    return false;
  }
  const {
    rangeDates: [startDate, endDate],
    selectMetersButton: { checkedMeters },
    scaleVisualization,
  } = meterFilterTreeValue;
  return !!(checkedMeters.length && startDate && endDate && scaleVisualization);
};

export const isSelectedCompany = (company) => {
  if (company && company.id) return true;
  return false;
};

export const isUserRoot = (user) => {
  if (user && user.role === 'root') return true;
  return false;
};
