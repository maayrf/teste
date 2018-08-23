/**
 *
 * StatusIndicator
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Row } from 'antd';
import './style.less';

class StatusIndicator extends Component {
  renderBadges = () => {
    const { status, activeKey } = this.props;
    return status.map((statusProps) => (
      <Badge
        {...statusProps}
        key={`${statusProps.text}-${statusProps.key}`}
        className={activeKey === statusProps.key ? 'active' : ''}
      />
    ));
  };
  render() {
    return (
      <Row type="flex" className="status-indicator">
        {this.renderBadges()}
      </Row>
    );
  }
}

StatusIndicator.propTypes = {
  activeKey: PropTypes.any,
  status: PropTypes.array.isRequired,
};

export default StatusIndicator;
