/**
 *
 * DemandExceedChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import { colors } from '../../utils/generateColors';
import './style.less';

const scale = (maxPower, hoursInMonth) => ({
  power: {
    min: 1,
    max: maxPower,
  },
  hour: {
    max: hoursInMonth,
    min: 1,
    nice: false,
    tickInterval: hoursInMonth / 7,
    formatter: (value) => `${parseInt(value)}h`,
  },
});

const DemandExceedChart = ({
  dataSource,
  demandExceed,
  maxPowerDemand,
  handleWidth,
  hoursInMonth,
}) => {
  const { powerDemands, fields } = dataSource;
  const maxPower = demandExceed
    ? maxPowerDemand > demandExceed
      ? maxPowerDemand
      : demandExceed
    : demandExceed;
  const dataSet = new DataSet();
  const dataSetView = dataSet.createView().source(powerDemands);
  dataSetView.transform({
    type: 'fold',
    fields,
    key: 'items',
    value: 'power',
  });

  return (
    <div className="demand-exceed-chart" ref={(node) => handleWidth(node)}>
      <Chart
        height={300}
        scale={scale(maxPower, hoursInMonth)}
        forceFit
        data={dataSetView}
        padding="auto"
      >
        <Legend />
        <Axis name="hour" />
        <Axis name="power" />
        <Tooltip />
        <Geom
          type="line"
          position="hour*power"
          size={2}
          color={['items', [...colors]]}
        />
      </Chart>
    </div>
  );
};

DemandExceedChart.propTypes = {
  dataSource: PropTypes.object.isRequired,
  demandExceed: PropTypes.number,
  handleWidth: PropTypes.func.isRequired,
  maxPowerDemand: PropTypes.number,
  hoursInMonth: PropTypes.number,
};

export default DemandExceedChart;
