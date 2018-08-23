export const convertDataSource = ({ meters, summary }) => {
  const callback = (_obj) => ({
    id: _obj.id,
    name: _obj.name || _obj.tradename,
    className: _obj.className,
    color: _obj.color,
    ..._obj.summary,
  });

  const metersValues = meters ? meters.map(callback) : [];
  const summaryValues = summary || {};
  summaryValues.name = 'Total';
  summaryValues.id = '0';

  return [...metersValues, summaryValues];
};
