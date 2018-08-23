/**
 *
 * DashboardCardRealTime
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Card, Col, Row } from 'antd';
import './style.less';
import { formatToDecimal } from '../../utils/formatNumber';
import { DashboardIndicator } from '../Dashboard/components/DashboardIndicators';
import CurrentHoursClock from '../CurrentHoursClock/index';
import StatusIndicator from '../StatusIndicator/index';
import PowerDemandIcon from '../Icons/PowerDemandIcon';
import MeterWifiIcon from '../Icons/MeterWifiIcon';

const DashboardCardRealTime = ({ dashboard }) => {
  const {
    powerDemand = {},
    metersActive = {
      active: 0,
      total: 0,
    },
    isProductiveHour,
    isRushHour,
  } = dashboard;
  return (
    <Card
      style={{
        background: 'none',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
      }}
      bodyStyle={{ padding: 0 }}
      className="_margin-bottom"
    >
      <Row type="flex" justify="start" className="dashboard-card-real-time">
        <Col>
          <DashboardIndicator
            className="_border-none"
            title={
              <Row type="flex" gutter={10}>
                <span>Agora</span>
                <Badge status="processing" text="Ao vivo" />
              </Row>
            }
            content={
              <Row type="flex" gutter={30} align="middle">
                <Col>
                  <CurrentHoursClock />
                </Col>
                <Col>
                  <Row type="flex" gutter={5}>
                    <Col>
                      <StatusIndicator
                        activeKey={isProductiveHour}
                        status={[
                          {
                            status: 'success',
                            key: isProductiveHour,
                            text: 'Produtivo',
                          },
                          {
                            status: 'error',
                            key: !isProductiveHour,
                            text: 'Não Produtivo',
                          },
                        ]}
                      />
                    </Col>
                    <Col>
                      <StatusIndicator
                        activeKey={isRushHour}
                        status={[
                          {
                            status: 'error',
                            key: isRushHour,
                            text: 'Ponta',
                          },
                          {
                            status: 'success',
                            key: !isRushHour,
                            text: 'Fora de Ponta',
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
          />
        </Col>
        <Col>
          <DashboardIndicator
            className="_border-none _border-left _border-radius-none"
            title="Demanda de potência"
            icon={<PowerDemandIcon height="50px" />}
            content={
              <h3>
                {`${formatToDecimal(powerDemand.value)} ${powerDemand.unit}`}
              </h3>
            }
          />
        </Col>
        <Col>
          <DashboardIndicator
            icon={<MeterWifiIcon height="50px" />}
            className="_border-none _border-left _border-radius-none"
            title="Medidores Ativos"
            content={<h3>{`${metersActive.active}/${metersActive.total}`}</h3>}
          />
        </Col>
      </Row>
    </Card>
  );
};

DashboardCardRealTime.propTypes = {
  dashboard: PropTypes.shape({
    powerDemand: PropTypes.object,
    metersActive: PropTypes.object,
  }).isRequired,
};

export default DashboardCardRealTime;
