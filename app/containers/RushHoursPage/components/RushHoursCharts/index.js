import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import IconEmptyElectric from '../../../../components/IconEmptyElectric/index';
import RushHoursPizzaChartOfConsumptionPercentage from './RushHoursPizzaChartOfConsumptionPercentage';
import RushHoursPizzaChartOfCostPercentage from './RushHoursPizzaChartOfCostPercentage';

const RushHoursCharts = ({ rushHours }) => {
  if (!Object.keys(rushHours).length) {
    return <IconEmptyElectric height={300} />;
  }
  return (
    <Row align="middle" className="_margin-bottom">
      <Col span={12}>
        <RushHoursPizzaChartOfConsumptionPercentage rushHours={rushHours} />
      </Col>
      <Col span={12}>
        <RushHoursPizzaChartOfCostPercentage rushHours={rushHours} />
      </Col>
    </Row>
  );
};

RushHoursCharts.propTypes = {
  rushHours: PropTypes.object.isRequired,
};

export default RushHoursCharts;
