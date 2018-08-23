import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import IconEmptyElectric from '../../../../components/IconEmptyElectric/index';
import ProductiveHoursPizzaChartOfConsumptionPercentage from './ProductiveHoursPizzaChartOfConsumptionPercentage';
import ProductiveHoursPizzaChartOfCostPercentage from './ProductiveHoursPizzaChartOfCostPercentage';

const ProductiveHoursCharts = ({ productiveHours }) => {
  if (!Object.keys(productiveHours).length) {
    return <IconEmptyElectric height={300} />;
  }
  return (
    <Row align="middle" className="_margin-bottom">
      <Col span={12}>
        <ProductiveHoursPizzaChartOfConsumptionPercentage
          productiveHours={productiveHours}
        />
      </Col>
      <Col span={12}>
        <ProductiveHoursPizzaChartOfCostPercentage
          productiveHours={productiveHours}
        />
      </Col>
    </Row>
  );
};

ProductiveHoursCharts.propTypes = {
  productiveHours: PropTypes.object.isRequired,
};

export default ProductiveHoursCharts;
