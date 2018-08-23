import React from 'react';
import { Chart, Geom, Tooltip, Label } from 'bizcharts';
import PropTypes from 'prop-types';
import { DataSet } from '@antv/data-set/build/data-set';
import './style.less';
import { colors } from '../../utils/generateColors';
import { formatDataToCostStructureChart } from './utils';
import { formatToDecimal } from '../../utils/formatNumber';

const CostStructureChart = ({ height = 300, costStructure, currency }) => {
  const { DataView } = DataSet;
  const dataView = new DataView();

  const data = {
    name: 'root',
    children: formatDataToCostStructureChart(costStructure),
  };

  dataView
    .source(data, {
      type: 'hierarchy',
    })
    .transform({
      field: 'value',
      type: 'hierarchy.treemap',
      tile: 'treemapResquarify',
      as: ['x', 'y'],
    });
  const nodes = dataView.getAllNodes();
  nodes.map((node) => {
    node.name =
      node.data.name !== 'root'
        ? `${node.data.name} - ${currency} ${formatToDecimal(node.data.value)}`
        : null;
    node.value = node.data.value;
    return node;
  });

  const scale = {
    value: { nice: false },
  };

  const mouseOverLegend =
    '<li data-index={index}>' +
    '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
    '{name}<br/>' +
    '<span style="padding-left: 16px">{count}</span><br/>' +
    '</li>';
  return (
    <div>
      <Chart data={nodes} height={height} scale={scale} padding="auto" forceFit>
        <Tooltip showTitle={false} itemTpl={mouseOverLegend} />
        <Geom
          type="polygon"
          position="x*y"
          color={['name', [...colors]]}
          tooltip={[
            'name*value',
            (name, count) => {
              const newCount = `${currency} ${formatToDecimal(count)}`;
              return {
                name,
                count: newCount,
              };
            },
          ]}
          style={{ lineWidth: 1, stroke: '#fff' }}
        >
          <Label
            content="name"
            offset={0}
            textStyle={{ textBaseline: 'middle' }}
            formatter={(val) => {
              if (val !== 'root') {
                return val;
              }
            }}
          />
        </Geom>
      </Chart>
    </div>
  );
};

CostStructureChart.propTypes = {
  height: PropTypes.number,
  costStructure: PropTypes.object,
  currency: PropTypes.string.isRequired,
};

export default CostStructureChart;
