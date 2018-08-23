/**
 *
 * PerformanceIndexChart
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import './style.less';
import { colors } from '../../utils/generateColors';
import { formatToDecimal } from '../../utils/formatNumber';

const REFERENCE_TITLES = {
  CONSUMPTION_TOTAL: 'Consumo Total',
};

class PerformanceIndexChart extends Component {
  getScale = () => ({
    weeks: {
      alias: 'Semanas',
    },
    powerConsumptionValue: {
      alias: 'Consumo',
      min: 0,
    },
    costConsumptionValue: {
      alias: 'Custo',
      min: 0,
    },
  });
  getUnits = (data) => {
    if (data.length) {
      const [{ powerConsumptionUnit, costConsumptionUnit }] = data;
      return {
        powerConsumptionUnit,
        costConsumptionUnit,
      };
    }
    return {
      powerConsumptionUnit: '',
      costConsumptionUnit: '',
    };
  };
  getReferenceUnit = (data) => {
    if (data.length) {
      const [{ unit }] = data;
      return unit;
    }
    return '';
  };
  getReferenceParam = (data) => {
    if (data.length) {
      const [{ referenceParam }] = data;
      return REFERENCE_TITLES[referenceParam];
    }
    return '';
  };
  render() {
    const { dataSource } = this.props;
    const units = this.getUnits(dataSource);
    const referenceUnit = this.getReferenceUnit(dataSource);
    const referenceParam = this.getReferenceParam(dataSource);

    return (
      <div className="performance-index-chart">
        <h3>{referenceParam}</h3>
        <Chart
          height={300}
          data={dataSource}
          scale={this.getScale()}
          padding={['auto', 'auto', 80, 'auto']}
          forceFit
        >
          <Legend
            custom
            clickable={false}
            items={[
              {
                value: `${referenceUnit}/${units.powerConsumptionUnit}`,
                marker: { symbol: 'square', fill: colors[1], radius: 5 },
              },
              {
                value: `${referenceUnit}/${units.costConsumptionUnit}`,
                marker: {
                  symbol: 'hyphen',
                  stroke: colors[0],
                  radius: 5,
                  lineWidth: 3,
                },
              },
            ]}
          />
          <Axis
            name="powerConsumptionValue"
            label={{
              textStyle: {
                fill: colors[1],
              },
            }}
          />
          <Axis
            name="costConsumptionValue"
            grid={null}
            label={{
              textStyle: {
                fill: colors[0],
              },
            }}
          />
          <Tooltip />
          <Geom
            type="interval"
            position="week*powerConsumptionValue"
            color={colors[1]}
            tooltip={[
              'week*powerConsumptionValue*powerConsumptionUnit',
              (week, powerValue, powerUnit) => ({
                title: week,
                name: 'Consumo',
                value: `${formatToDecimal(powerValue)}/${powerUnit}`,
              }),
            ]}
          />
          <Geom
            type="line"
            position="week*costConsumptionValue"
            color={colors[0]}
            size={3}
            shape="city"
            tooltip={[
              'week*costConsumptionValue*costConsumptionUnit',
              (week, costValue, costUnit) => ({
                title: week,
                name: 'Custo',
                value: `${formatToDecimal(costValue)}/${costUnit}`,
              }),
            ]}
          />
          <Geom
            type="point"
            position="week*costConsumptionValue"
            color={colors[0]}
            size={3}
            shape="circle"
          />
        </Chart>
      </div>
    );
  }
}
PerformanceIndexChart.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default PerformanceIndexChart;
