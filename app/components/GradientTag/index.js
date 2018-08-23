/**
 *
 * GradientTag
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const GradientTag = ({
  children, color, height, style, ...restProps
}) => {
  const borderRadius = 5;
  return (
    <div
      {...restProps}
      className="gradient-tag"
      style={{
        ...style,
        height,
        background: color,
        borderRadius,
      }}
    >
      {children}
    </div>
  );
};

GradientTag.defaultProps = {
  color: '#CCC',
  height: '30px',
  style: {},
  children: <h2>Bandeira</h2>,
};
GradientTag.propTypes = {
  style: PropTypes.object,
  height: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default GradientTag;
