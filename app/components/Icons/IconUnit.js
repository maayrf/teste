import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const IconUnit = ({
  width = 14,
  height = 14,
  fill = '#fff',
  className,
  ...props
}) => (
  <svg
    className={`custom-icon ${className}`}
    width={width}
    height={height}
    viewBox="0 0 100 125"
    fill={fill}
    {...props}
  >
    <path d="M95.3,95.1c-30.2,0-60.3,0-90.5,0c0-26.7,0-53.4,0-80.2c4.3,0,8.5,0,12.8,0c0,17.4,0,34.7,0,52.3  c8.7-4.8,17.2-9.6,25.9-14.4c0,4.9,0,9.6,0,14.6c8.7-4.8,17.3-9.6,26-14.4c0,4.8,0,9.5,0,14.4c8.7-4.8,17.2-9.5,25.8-14.3  C95.3,67.1,95.3,81.1,95.3,95.1z" />
    <g>
      <path d="M80.9,21.3c-7.2-7-15.6-10.7-25.6-10.7c-9.9,0-18.4,3.7-25.4,10.6c-1-1.1-2.1-2.1-3.1-3.1c14.4-15.4,41-16.6,57.1,0   C83,19.2,82,20.2,80.9,21.3z" />
      <path d="M76.1,26.1c-1,1-2.1,2-3.1,3.1c-4.8-4.7-10.7-7.3-17.6-7.3c-6.9,0-12.7,2.6-17.6,7.4c-1-1.1-2-2.1-3-3.1   C45,14.8,64.7,14,76.1,26.1z" />
      <path d="M68.2,34c-1,1-2.1,2-3.1,3c-6.5-5.5-13-5.5-19.5,0c-1-1-2-2-3-3C48.4,27.3,60.7,26.1,68.2,34z" />
    </g>
  </svg>
);

IconUnit.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fill: PropTypes.string,
  className: PropTypes.string,
};

export default IconUnit;
