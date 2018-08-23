/**
 *
 * TrendIcon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './style.less';

const TrendIcon = ({ value }) => {
  let iconType = 'minus';
  if (value > 0) {
    iconType = 'arrow-up';
  } else if (value < 0) {
    iconType = 'arrow-down';
  }
  return <Icon type={iconType} />;
};

TrendIcon.propTypes = {
  value: PropTypes.number,
};

export default TrendIcon;
