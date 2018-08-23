/**
 *
 * ConsumptionChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import { formatConsumptionsDataToChart } from './formatConsumptionsDataToChart';
import { thereAreDataGraphic } from '../../utils/thereAreDataGraphic';
import renderFillBackgroundColor from '../../utils/renderFillBackgroundColor';
import IconEmptyElectric from '../IconEmptyElectric/index';

const ConsumptionChart = ({ consumptions }) => {
  if (!thereAreDataGraphic(consumptions)) {
    return <IconEmptyElectric height={300} />;
  }

  const { fields, dataGraphic } = formatConsumptionsDataToChart(consumptions);
  const dataSet = new DataSet();
  const dataSetView = dataSet.createView().source(dataGraphic);
  dataSetView.transform({
    type: 'fold',
    fields, // fields to be plotted (each of the bars)
    key: 'key', // Keys
    value: 'value', // Values
  });

  return (
    <div>
      <Chart height={400} data={dataSetView} forceFit>
        <Axis name="key" />
        <Axis name="value" label={{ formatter: (val) => `${val} kWh` }} />
        <Tooltip
          crosshairs={{ type: 'y' }}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value} kWh</li>"
        />
        <Geom
          type="intervalStack"
          position="key*value"
          color={[
            'applicationId*type',
            (applicationId, type) =>
              renderFillBackgroundColor(applicationId, type),
          ]}
          tooltip={[
            'name*value',
            (name, value) => ({
              name,
              value,
            }),
          ]}
        />
      </Chart>
    </div>
  );
};

ConsumptionChart.propTypes = {
  consumptions: PropTypes.object.isRequired,
};

export default ConsumptionChart;
