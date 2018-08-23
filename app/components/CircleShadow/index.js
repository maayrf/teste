/**
 *
 * CircleShadow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const CircleShadow = ({ style, size, children }) => (
  <div
    className="circle-shadow"
    style={{
      width: size,
      height: size,
      ...style,
      borderRadius: '50%',
    }}
  >
    {children}
  </div>
);

CircleShadow.defaultProps = {
  style: {},
  size: '50px',
};
CircleShadow.propTypes = {
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default CircleShadow;
