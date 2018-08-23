import React from 'react';
import PropTypes from 'prop-types';
import PizzaChart from '../../../../../components/PizzaChart/index';
import { formatDataToProductiveHoursChartsAndTable } from '../../../utils/formatDataToProductiveHoursChartsAndTable';

const ProductiveHoursPizzaChartOfConsumptionPercentage = ({
  productiveHours,
}) => (
  <PizzaChart
    chartData={productiveHours}
    percentageFieldName="consumptionPercentage"
    height={400}
    formatTo={formatDataToProductiveHoursChartsAndTable}
    label="Consumo de Energia (kWh)"
  />
);

ProductiveHoursPizzaChartOfConsumptionPercentage.propTypes = {
  productiveHours: PropTypes.object.isRequired,
};

export default ProductiveHoursPizzaChartOfConsumptionPercentage;
