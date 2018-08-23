import React from 'react';
import PropTypes from 'prop-types';
import { formatApportionmentConsumptionCharts } from '../utils/formatApportionmentConsumptionCharts';
import PizzaChart from '../../../../../components/PizzaChart/index';

const ApportionmentsPizzaChartOfCostPercentage = ({ apportionments }) => (
  <PizzaChart
    chartData={apportionments}
    percentageFieldName="costPercentage"
    height={400}
    formatTo={formatApportionmentConsumptionCharts}
    label="Custo (R$)"
  />
);

ApportionmentsPizzaChartOfCostPercentage.propTypes = {
  apportionments: PropTypes.object.isRequired,
};

export default ApportionmentsPizzaChartOfCostPercentage;
