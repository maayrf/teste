import React from 'react';
import PropTypes from 'prop-types';
import PizzaChart from '../../../../../components/PizzaChart/index';
import { formatDataToRushHoursChartsAndTable } from '../../../utils/formatDataToRushHoursChartsAndTable';

const RushHoursPizzaChartOfCostPercentage = ({ rushHours }) => (
  <PizzaChart
    chartData={rushHours}
    percentageFieldName="costPercentage"
    height={400}
    formatTo={formatDataToRushHoursChartsAndTable}
    label="Custo (R$)"
  />
);

RushHoursPizzaChartOfCostPercentage.propTypes = {
  rushHours: PropTypes.object.isRequired,
};

export default RushHoursPizzaChartOfCostPercentage;
