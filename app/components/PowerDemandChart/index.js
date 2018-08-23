/* eslint-disable array-callback-return */
/**
 *
 * PowerDemandChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Chart, Legend, Axis, Geom, Tooltip } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import { formatPowerDemandDataToChart } from './formatDemandDataToChart';
import { colors } from '../../utils/generateColors';
import { thereAreDataGraphic } from '../../utils/thereAreDataGraphic';
import IconEmptyElectric from '../IconEmptyElectric/index';

const PowerDemandChart = ({ powerDemands }) => {
  if (!thereAreDataGraphic(powerDemands)) {
    return <IconEmptyElectric height={300} />;
  }
  const { dataGraph, fields } = formatPowerDemandDataToChart(powerDemands);
  const dataSet = new DataSet();
  const dataSetView = dataSet.createView().source(dataGraph);
  dataSetView.transform({
    type: 'fold',
    fields, // Field of legends
    key: 'items', // Key
    value: 'power', // value
  });
  const cols = {
    readDate: {
      range: [0, 1],
    },
  };

  const color = ['items', [...colors]];

  return (
    <div>
      <Chart height={400} data={dataSetView} scale={cols} forceFit>
        <Legend itemFormatter={(param) => param} />
        <Axis name="readDate" />
        <Axis name="power" label={{ formatter: (val) => `${val} kWh` }} />
        <Tooltip
          crosshairs={{ type: 'y' }}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value} kW</li>"
        />
        <Geom
          type="line"
          position="readDate*power"
          size={2}
          color={color}
          shape="city"
        />
        <Geom
          type="point"
          position="readDate*power"
          size={4}
          shape="circle"
          color={color}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
    </div>
  );
};

PowerDemandChart.propTypes = {
  powerDemands: PropTypes.object.isRequired,
};

export default PowerDemandChart;
