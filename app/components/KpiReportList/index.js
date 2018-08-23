/**
 *
 * KpiReportList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import KpiReportDate from './KpiReportDate';

const KpiReportList = ({ kpiReportDates }) => (
  <List
    className="kpi-report-dates"
    dataSource={kpiReportDates}
    renderItem={(kpiDate) => <KpiReportDate data={kpiDate} />}
  />
);

KpiReportList.propTypes = {
  kpiReportDates: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default KpiReportList;
