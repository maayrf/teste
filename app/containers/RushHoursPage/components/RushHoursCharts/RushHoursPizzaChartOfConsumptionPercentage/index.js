import React from 'react';
import PropTypes from 'prop-types';
import PizzaChart from '../../../../../components/PizzaChart/index';
import { formatDataToRushHoursChartsAndTable } from '../../../utils/formatDataToRushHoursChartsAndTable';

const RushHoursPizzaChartOfConsumptionPercentage = ({ rushHours }) => (
  <PizzaChart
    chartData={rushHours}
    percentageFieldName="consumptionPercentage"
    height={400}
    formatTo={formatDataToRushHoursChartsAndTable}
    label="Consumo de Energia"
  />
);

RushHoursPizzaChartOfConsumptionPercentage.propTypes = {
  rushHours: PropTypes.object.isRequired,
};

export default RushHoursPizzaChartOfConsumptionPercentage;
