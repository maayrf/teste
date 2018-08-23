import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './KpiReportDate.less';
import KpiReport from './KpiReport';
import FillKpiReportFormContainer from '../../containers/FillKpiReportFormContainer';
import KpiCounter from './KpiCounter';

const KpiReportDate = ({ data: { date, reports } }) => (
  <div className="KpiReportDate">
    <header className="row -justify-space-between">
      <div>
        <strong className="kpi-date">
          {moment(date).format('DD/MM/YYYY')}
        </strong>
        <KpiCounter reports={reports} />
      </div>
      <FillKpiReportFormContainer date={date} reports={reports} />
    </header>

    {reports.map(({ id, ...report }) => <KpiReport key={id} report={report} />)}
  </div>
);

KpiReportDate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default KpiReportDate;
