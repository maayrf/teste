/**
 *
 * DefaultWarningToChart
 *
 */

import React from 'react';
import { Row } from 'antd';
import IconEmptyMeterTree from '../../components/IconEmptyMeterTree';

const DefaultWarningToChart = () => (
  <Row type="flex" justify="center" align="middle" style={{ height: '300px' }}>
    <div>
      <h3 className="_uppercase _margin-bottom">
        Preencha a seleção de medidores e a escala de visualização para
        visualizar o gráfico
      </h3>
      <IconEmptyMeterTree />
    </div>
  </Row>
);

export default DefaultWarningToChart;
