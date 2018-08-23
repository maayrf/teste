/**
 *
 * WastePerHourChart
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import PizzaChart from '../PizzaChart/index';
import { formatDataToDashboardWastePerHourChart } from './utils';

class WastePerHourChart extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="waste-per-hour-chart">
        <PizzaChart
          chartData={data}
          percentageFieldName="costPercentage"
          height={300}
          formatTo={formatDataToDashboardWastePerHourChart}
          label=""
        />
      </div>
    );
  }
}

WastePerHourChart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WastePerHourChart;
