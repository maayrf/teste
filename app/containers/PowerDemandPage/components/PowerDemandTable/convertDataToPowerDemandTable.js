export const convertDataToPowerDemandTable = ({ meters, summary }) => {
  const callbackCreate = (_obj) => ({
    id: _obj.id,
    name: _obj.name || _obj.tradename,
    className: _obj.className,
    color: _obj.color,
    ..._obj.summary,
  });
  const newMeters = meters ? meters.map(callbackCreate) : [];
  const summaryValues = summary || {};
  summaryValues.name = 'Total';
  summaryValues.id = '0';

  return [...newMeters, summaryValues];
};
