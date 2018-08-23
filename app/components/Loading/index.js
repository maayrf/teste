/**
 *
 * Loading
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import './style.less';

const Loading = ({ children = 'Carregando' }) => (
  <span>
    <Icon type="loading" />
    {children}
  </span>
);

Loading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default Loading;
