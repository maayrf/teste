import React from 'react';
import PropTypes from 'prop-types';
import { formatApportionmentConsumptionCharts } from '../utils/formatApportionmentConsumptionCharts';
import PizzaChart from '../../../../../components/PizzaChart/index';

const ApportionmentsPizzaChartOfConsumptionPercentage = ({
  apportionments,
}) => (
  <PizzaChart
    chartData={apportionments}
    percentageFieldName="consumptionPercentage"
    height={400}
    formatTo={formatApportionmentConsumptionCharts}
    label="Consumo de Energia"
  />
);

ApportionmentsPizzaChartOfConsumptionPercentage.propTypes = {
  apportionments: PropTypes.object.isRequired,
};

export default ApportionmentsPizzaChartOfConsumptionPercentage;
