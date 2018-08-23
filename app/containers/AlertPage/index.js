/**
 *
 * AlertPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import './style.less';
import AlertTabs from './components/AlertTabs/index';

class AlertPage extends Component {
  render() {
    return (
      <div className="alert-page">
        <h1 className="_uppercase _page-title">Alertas</h1>
        <Card style={{ position: 'relative' }}>
          <AlertTabs />
        </Card>
      </div>
    );
  }
}

AlertPage.propTypes = {};

export default AlertPage;
