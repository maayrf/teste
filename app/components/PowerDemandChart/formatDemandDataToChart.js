import moment from 'moment';

export const formatPowerDemandDataToChart = ({ meters }) => {
  const dataGraphObject = {};
  let spaces = '';
  for (let i = 0; i < meters.length; i += 1) {
    const meter = meters[i];
    let name = meter.name || meter.tradename;
    name += spaces;
    spaces += ' ';

    for (let j = 0; j < meter.power.items.length; j += 1) {
      const item = meter.power.items[j];
      const readDate = moment(item.readDate).format('DD/MM/YYYY HH:MM');
      const { power } = item;
      if (!dataGraphObject[readDate]) {
        dataGraphObject[readDate] = {};
      }
      dataGraphObject[readDate][name] = power;
    }
  }

  const dataGraph = Object.keys(dataGraphObject).map((readDate) => ({
    ...dataGraphObject[readDate],
    readDate,
  }));

  const fields = Object.keys(dataGraph[0]).filter((item) => item !== 'readDate');

  return {
    dataGraph,
    fields,
  };
};
