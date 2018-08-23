import React from 'react';
import PropTypes from 'prop-types';
import PizzaChart from '../../../../../components/PizzaChart/index';
import { formatDataToProductiveHoursChartsAndTable } from '../../../utils/formatDataToProductiveHoursChartsAndTable';

const ProductiveHoursPizzaChartOfCostPercentage = ({ productiveHours }) => (
  <PizzaChart
    chartData={productiveHours}
    percentageFieldName="costPercentage"
    height={400}
    formatTo={formatDataToProductiveHoursChartsAndTable}
    label="Custo (R$)"
  />
);

ProductiveHoursPizzaChartOfCostPercentage.propTypes = {
  productiveHours: PropTypes.object.isRequired,
};

export default ProductiveHoursPizzaChartOfCostPercentage;
