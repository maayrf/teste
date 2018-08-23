const branchesIds = [];
const groupingsIds = [];
const eggsIds = [];

const formatToCategorizedSelectedMeters = (metersList) => {
  for (let i = 0; i < metersList.length; i += 1) {
    const meter = metersList[i];
    switch (meter.className) {
      case 'branch':
        branchesIds.push(meter.id);
        break;
      case 'grouping':
        groupingsIds.push(meter.id);
        break;
      case 'egg':
        eggsIds.push(meter.id);
        break;
      default:
        break;
    }
  }
  return {
    branchesIds,
    groupingsIds,
    eggsIds,
  };
};

export default formatToCategorizedSelectedMeters;
