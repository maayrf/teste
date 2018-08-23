/**
 * @param metersList
 * returns a new metersList ensuring that applicationId attribute is unique for each of them
 */
export const generateApplicationIds = (metersList) => {
  const meterListWithApplicationIds = metersList;
  for (let i = 0; i < meterListWithApplicationIds.length; i += 1) {
    meterListWithApplicationIds[i].applicationId = String(i + 1);
  }
  return meterListWithApplicationIds;
};
