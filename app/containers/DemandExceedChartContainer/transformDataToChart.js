export const transformDataToChart = (powerDemands, demandExceed) => {
  const newData = [];
  for (let i = 0; i < powerDemands.length; i += 1) {
    const powerDemand = powerDemands[i];
    const { hour, power } = powerDemand;
    const powerValue = power.power;
    newData.push({
      hour,
      'Demanda (kW)': powerValue,
      Ultrapassagem: demandExceed,
    });
  }
  const fields = newData.length
    ? Object.keys(newData[0]).filter((key) => key !== 'hour')
    : [];
  return { powerDemands: newData, fields };
};

//  Return exemple:
// { hour: '14', power: 123, maxDemand: 210 }
