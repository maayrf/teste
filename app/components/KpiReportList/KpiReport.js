import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './KpiReport.less';

const KpiReport = ({
  report: {
    value, startDate, endDate, kpiConfiguration,
  } = {},
  renderValue,
}) => {
  let kpiConfigurationInterval;
  let showEndDate = true;
  switch (kpiConfiguration.dateInterval) {
    case 'ONE_WEEK':
      kpiConfigurationInterval = 'na semana';
      break;
    case 'ONE_MONTH':
    default:
      showEndDate = false;
      kpiConfigurationInterval = 'no mês';
      break;
  }

  return (
    <div className="kpi-report row -justify-center">
      <p className="kpi-name">{kpiConfiguration.name}</p>
      <div className="kpi-value">
        {renderValue(value, kpiConfiguration.unit)}
      </div>
      <p className="kpi-date-interval">
        {kpiConfigurationInterval} de{' '}
        <strong>{moment(startDate).format('DD/MM/YYYY')}</strong>
        {showEndDate &&
          endDate && <strong> à {moment(endDate).format('DD/MM/YYYY')}</strong>}
      </p>
    </div>
  );
};

KpiReport.defaultProps = {
  renderValue: (value, unit) => (
    <h3>
      {value || '--'} {unit}
    </h3>
  ),
};

KpiReport.propTypes = {
  report: PropTypes.object.isRequired,
  renderValue: PropTypes.func,
};

export default KpiReport;
