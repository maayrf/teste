import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import IconEmptyElectric from '../../../../components/IconEmptyElectric/index';
import ApportionmentsPizzaChartOfConsumptionPercentage from './ApportionmentsPizzaChartOfConsumptionPercentage';
import ApportionmentsPizzaChartOfCostPercentage from './ApportionmentsPizzaChartOfCostPercentage';

const ApportionmentsConsumptionCharts = ({ apportionments }) => {
  if (!Object.keys(apportionments).length) {
    return <IconEmptyElectric height={300} />;
  }
  return (
    <Row align="middle" className="_margin-bottom">
      <Col span={12}>
        <ApportionmentsPizzaChartOfConsumptionPercentage
          apportionments={apportionments}
        />
      </Col>
      <Col span={12}>
        <ApportionmentsPizzaChartOfCostPercentage
          apportionments={apportionments}
        />
      </Col>
    </Row>
  );
};

ApportionmentsConsumptionCharts.propTypes = {
  apportionments: PropTypes.object.isRequired,
};

export default ApportionmentsConsumptionCharts;
