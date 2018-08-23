/**
 *
 * MeterNetworkConfiguration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import './style.less';
import MeterNetworkCreateModalButton from '../MeterNetworkCreateModalButton';
import MeterNetworkConfigurationListContainer from '../../containers/MeterNetworkConfigurationListContainer';

const MeterNetworkConfiguration = ({ egg }) => (
  <div className="meter-network-configuration _margin-bottom _padding-bottom _border-bottom">
    <Row type="flex" gutter={20}>
      <Col span={24} className="_margin-bottom">
        <Row type="flex" justify="space-between" align="middle" gutter={20}>
          <Col>
            <h2 className="_page-title">Rede</h2>
          </Col>
          <Col>
            <MeterNetworkCreateModalButton meterId={egg.id} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <MeterNetworkConfigurationListContainer meterId={egg.id} />
      </Col>
    </Row>
  </div>
);

MeterNetworkConfiguration.propTypes = {
  egg: PropTypes.object.isRequired,
};

export default MeterNetworkConfiguration;
