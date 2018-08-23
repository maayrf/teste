/**
 *
 * DashboardEmptyState
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import emptyState from '../../assets/img/empty-state-dashboard.png';
import './style.less';

const DashboardEmptyState = () => (
  <Row
    type="flex"
    justify="center"
    align="middle"
    className="dashboard-empty-state"
  >
    <Col>
      <img src={emptyState} alt="imagem ilustrativa do dashboard" />
    </Col>
    <Col span={24} className="_margin-top">
      <h3 className="_align-center">
        Preencha o filtro acima para visualizar o dashboard!
      </h3>
    </Col>
  </Row>
);

// DashboardEmptyState.propTypes = {
//
// };

export default DashboardEmptyState;
