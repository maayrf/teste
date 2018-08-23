import moment from 'moment';
import { generateApplicationIds } from '../../utils/generateApplicationIds';

export const formatConsumptionsDataToChart = ({ meters }) => {
  const callbackCreate = (meter) => {
    const result = {
      type: meter.className,
      name: meter.name || meter.tradename,
      color: meter.color,
    };
    for (let i = 0; i < meter.consumption.items.length; i += 1) {
      const item = meter.consumption.items[i];
      result[moment(item.readDate).format('DD/MM/YYYY HH:MM')] =
        item.consumption;
    }
    return result;
  };

  const metersValues = generateApplicationIds(meters.map(callbackCreate));
  const regexpToDate = /^\d{2}\/\d{2}\/\d{4}\s\d{2}\:\d{2}/;
  const fields = Object.keys(metersValues[0]).filter((key) =>
    regexpToDate.test(key));
  return {
    fields,
    dataGraphic: metersValues,
  };
};
