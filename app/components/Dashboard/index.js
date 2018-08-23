/**
 *
 * DashboardList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import moment from 'moment';
import { FinanceIndicator } from './components/DashboardIndicators';
import DemandExceedChartContainer from '../../containers/DemandExceedChartContainer';
import PerformanceIndexChartContainer from '../../containers/PerformanceIndexChartContainer';
import DashboardCardRealTime from '../DashboardCardRealTime';
import DashboardEmptyState from '../DashboardEmptyState';
import WastePerHourContainer from '../../containers/WastePerHourContainer/index';
import CostStructureContainer from '../../containers/CostStructureContainer/index';
import PowerIndicator from '../PowerIndicator';

const isCurrentDate = (month, year) => {
  const currentMonth = parseInt(moment().format('M'));
  const currentYear = parseInt(moment().format('YYYY'));
  return currentMonth === parseInt(month) && currentYear === parseInt(year);
};

const GUTTER = 20;

const Dashboard = ({
  dashboard, month, year, branchId, ...props
}) => {
  // If there's no filter selected show empty state
  if (!branchId) {
    return <DashboardEmptyState />;
  }

  const {
    fareFlag,
    financialSummary,
    consumption = {},
    higherConsumptionEgg = {},
    carbonDioxideEmitted = {},
    consumptionTrendPercentageComparedToPreviousMonth,
    powerDemand = {},
    wastePerHour = {},
    costStructure = {},
  } = dashboard;

  // Get the current month
  const currentMonthDate = moment(`${year}-${month}`);
  const currentMonth = (
    <span>
      <span className="_camelcase">{currentMonthDate.format('MMMM')}</span> de{' '}
      {currentMonthDate.format('YYYY')}
    </span>
  );

  return (
    <div className="dashboard-list">
      {isCurrentDate(month, year) && (
        <DashboardCardRealTime dashboard={dashboard} />
      )}
      <Row className="_margin-bottom" gutter={GUTTER}>
        <Col span={12}>
          <Col span={24} className="_margin-bottom">
            <FinanceIndicator
              {...financialSummary}
              currentMonth={currentMonth}
              fareFlag={fareFlag}
              trendValue={consumptionTrendPercentageComparedToPreviousMonth}
              higherConsumptionEgg={higherConsumptionEgg}
            />
          </Col>
          <Col span={24} className="_margin-bottom">
            <PowerIndicator
              consumption={consumption}
              carbonDioxideEmitted={carbonDioxideEmitted}
            />
          </Col>
          <Col span={24} className="_margin-bottom">
            <PerformanceIndexChartContainer
              month={month}
              year={year}
              branchId={branchId}
            />
          </Col>
          <Col span={24} className="_margin-bottom">
            <WastePerHourContainer
              month={month}
              year={year}
              wastePerHour={wastePerHour}
            />
          </Col>
        </Col>
        <Col span={12}>
          <Col span={24} className="_margin-bottom">
            <DemandExceedChartContainer
              month={month}
              year={year}
              branchId={branchId}
            />
          </Col>
          <Col span={24} className="_margin-bottom">
            <CostStructureContainer
              month={month}
              year={year}
              costStructure={costStructure}
            />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

Dashboard.propTypes = {
  dashboard: PropTypes.object.isRequired,
  month: PropTypes.number,
  year: PropTypes.number,
  branchId: PropTypes.number,
};

export default Dashboard;
