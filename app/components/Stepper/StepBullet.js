import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './styles/StepBullet.less';

const StepBullet = ({ value, showValidIcon }) =>
  showValidIcon ? (
    <Icon className="StepBullet" type="check-circle" />
  ) : (
    <span className="StepBullet">{value}</span>
  );

StepBullet.defaultProps = {
  showValidIcon: false,
};

StepBullet.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  showValidIcon: PropTypes.bool,
};

export default StepBullet;
