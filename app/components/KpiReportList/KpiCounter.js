import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './KpiCounter.less';

const KpiCounter = ({ reports }) => {
  const validKpis = reports.filter((report) => report.value !== null);
  const totalKpis = reports.length;
  const totalInvalidKpis = totalKpis - validKpis.length;

  let invalidKpis = null;
  if (totalInvalidKpis) {
    // Mensagem caso seja singular ou plural
    const invalidKpisMessage =
      totalInvalidKpis > 1
        ? 'Índices de performance não foram preenchidos'
        : 'Índices de performance não foi preenchido';

    invalidKpis = (
      <span className="missing-kpi-report">
        <Icon type="exclamation-circle" />
        {totalInvalidKpis} {invalidKpisMessage}
      </span>
    );
  }

  return (
    <div className="kpi-counter">
      <span>
        {validKpis.length}/{totalKpis} Índices de performance
      </span>
      {invalidKpis}
    </div>
  );
};

KpiCounter.propTypes = {
  reports: PropTypes.array.isRequired,
};

export default KpiCounter;
