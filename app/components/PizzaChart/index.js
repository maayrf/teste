import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts';
import PropTypes from 'prop-types';
import { DataSet } from '@antv/data-set/build/data-set';
import { thereAreDataGraphic } from '../../utils/thereAreDataGraphic';
import renderFillBackgroundColor from '../../utils/renderFillBackgroundColor';
import './style.less';

const PizzaChart = ({
  chartData,
  percentageFieldName,
  height,
  formatTo,
  label,
}) => {
  const { DataView } = DataSet;
  const dataView = new DataView();
  const cols = {
    percent: {
      formatter: (val) => {
        const valResult = `${val * 100}%`;
        return valResult;
      },
    },
  };

  if (!thereAreDataGraphic(chartData)) {
    return (
      <h1 className="_align-center">
        Não há nenhum dado para ser exibido neste gráfico!
      </h1>
    );
  }

  const result = formatTo(chartData);

  const data = result.chartData ? result.chartData : result;
  dataView.source(data).transform({
    type: 'percent',
    field: percentageFieldName,
    dimension: 'applicationId',
    as: 'percent',
  });

  return (
    <div className="pizza-chart">
      <Chart
        height={height}
        data={dataView}
        scale={cols}
        padding="auto"
        forceFit
      >
        <Coord type="theta" radius={0.75} />
        <Axis name="percent" />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Geom
          type="intervalStack"
          position="percent"
          color={[
            'applicationId*type',
            (applicationId, type) =>
              renderFillBackgroundColor(applicationId, type),
          ]}
          tooltip={[
            'name*percent',
            (name, percent) => {
              const percentResult = `${percent * 100}%`;
              return {
                name,
                value: percentResult,
              };
            },
          ]}
          style={{ lineWidth: 1, stroke: '#fff' }}
        >
          <Label
            content="percent"
            offset={-40}
            textStyle={{
              rotate: 0,
              textAlign: 'center',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)',
            }}
          />
        </Geom>
      </Chart>
      {label && <h3>{label}</h3>}
    </div>
  );
};

PizzaChart.propTypes = {
  label: PropTypes.string,
  formatTo: PropTypes.func.isRequired,
  chartData: PropTypes.object.isRequired,
  percentageFieldName: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default PizzaChart;
