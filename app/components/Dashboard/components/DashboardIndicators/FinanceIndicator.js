import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'antd';
import './styles/finance-indicator.less';
import { formatToDecimal } from '../../../../utils/formatNumber';
import TrendIndicator from './TrendIndicator';
import DashboardIndicator from './DashboardIndicator';
import GradientTag from '../../../GradientTag';
import FlagIcon from '../../../Icons/FlagIcon';
import MoreWasteIcon from '../../../Icons/MoreWasteIcon';

const CardGrid = Card.Grid;
const FARE_FLAGS_COLORS = {
  'Bandeira Amarela': {
    startColor: '#ffe500',
    endColor: '#ffc700',
  },
  'Bandeira Verde': {
    startColor: '#4dee3e',
    endColor: '#3fbf32',
  },
  'Bandeira Vermelha P1': {
    startColor: '#f26f6b',
    endColor: '#ff5b30',
  },
  'Bandeira Vermelha P2': {
    startColor: '#f2433f',
    endColor: '#a12a28',
  },
};
const getFareFlagColors = (fareFlag) => {
  const fareFlagColors = FARE_FLAGS_COLORS[fareFlag];
  return fareFlagColors || {};
};

const FinanceIndicator = ({
  unit,
  value,
  currentMonth,
  fareFlag,
  trendValue,
  higherConsumptionEgg,
}) => (
  <div className="finance-indicator">
    <h5>FINANCEIRO</h5>
    <Card className="dashboard-card" bodyStyle={{ padding: 0 }}>
      <Row type="flex" align="stretch">
        <Col>
          <CardGrid className="dashboard-card-grid">
            <Row type="flex" align="middle" style={{ marginBottom: '8px' }}>
              <h2>{currentMonth}</h2>
              <FlagIcon {...getFareFlagColors(fareFlag)} height="40px" />
            </Row>
            <GradientTag color={getFareFlagColors(fareFlag).startColor}>
              {fareFlag}
            </GradientTag>
          </CardGrid>
        </Col>
        <Row type="flex" align="middle" justify="center" style={{ flex: 1 }}>
          <CardGrid className="dashboard-card-grid">
            <h3>
              <Row type="flex" align="center" gutter={10}>
                <strong style={{ fontWeight: '300' }}>
                  {unit} {formatToDecimal(value)}
                </strong>{' '}
                <span>consumidos até agora</span>
              </Row>
            </h3>
          </CardGrid>
        </Row>
      </Row>
      <CardGrid className="dashboard-card-grid">
        <TrendIndicator trendValue={trendValue} />
      </CardGrid>
      <CardGrid className="dashboard-card-grid">
        <DashboardIndicator
          icon={<MoreWasteIcon height="70px" />}
          className="_border-none"
          bodyStyle={{ padding: 0 }}
          content={
            <div>
              <Row type="flex" align="medium" justify="space-between">
                <div>
                  <h3 className="sub-header-dashboard">MAIOR GASTO</h3>
                  <h3 style={{ paddingRight: 10, fontWeight: 300 }}>
                    {higherConsumptionEgg.name}
                  </h3>
                </div>
                <GradientTag
                  height="50px"
                  color="#f4f7f7"
                  style={{ paddingRight: '20px', paddingLeft: '20px' }}
                >
                  <h2>
                    {`${higherConsumptionEgg.unit} ${formatToDecimal(higherConsumptionEgg.cost)}`}
                  </h2>
                </GradientTag>
              </Row>
            </div>
          }
        />
      </CardGrid>
    </Card>
  </div>
);
FinanceIndicator.propTypes = {
  unit: PropTypes.string,
  value: PropTypes.number,
  currentMonth: PropTypes.element,
  previousMonth: PropTypes.string,
  fareFlag: PropTypes.string,
  trendValue: PropTypes.number,
  higherConsumptionEgg: PropTypes.object,
};

export default FinanceIndicator;
