/**
 *
 * PowerIndicator
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'antd';
import DashboardIndicator from '../Dashboard/components/DashboardIndicators/DashboardIndicator';
import { formatToDecimal } from '../../utils/formatNumber';
import './style.less';
import BatteryIcon from '../Icons/BatteryIcon';
import CarbonicGasIcon from '../Icons/CarbonicGasIcon';

const GUTTER = 20;
const CardGrid = Card.Grid;
const bodyStyle = { padding: 0 };

const PowerIndicator = ({ consumption, carbonDioxideEmitted }) => (
  <div className="power-indicator dashboard-card">
    <h5>ENERGIA</h5>
    <Card bodyStyle={bodyStyle}>
      <Row type="flex">
        <Col span={12}>
          <CardGrid className="dashboard-card-grid">
            <DashboardIndicator
              icon={<BatteryIcon height="60px" />}
              className="_border-none"
              title="Foram consumidos"
              bodyStyle={bodyStyle}
              content={
                <h3>
                  {`${formatToDecimal(consumption.value)} ${consumption.unit}`}
                </h3>
              }
            />
          </CardGrid>
        </Col>
        <Col span={12}>
          <CardGrid className="dashboard-card-grid">
            <DashboardIndicator
              icon={
                <CarbonicGasIcon
                  style={{ marginTop: '-10px', marginBottom: '-8px' }}
                  height="70px"
                />
              }
              title="Foram emitidos"
              className="_border-none"
              bodyStyle={bodyStyle}
              content={
                <h3>
                  {formatToDecimal(carbonDioxideEmitted.value)}{' '}
                  {carbonDioxideEmitted.unit} CO
                  <sub>2</sub>eq
                </h3>
              }
            />
          </CardGrid>
        </Col>
      </Row>
    </Card>
  </div>
);

PowerIndicator.propTypes = {
  consumption: PropTypes.object,
  carbonDioxideEmitted: PropTypes.object,
};

export default PowerIndicator;
