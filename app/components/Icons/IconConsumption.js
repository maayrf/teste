import React from 'react';

const IconConsumption = ({ width = '20px', height = '20px', ...props }) => (
  <svg width={width} height={height} {...props}>
    <circle
      cx={5.9}
      cy={5.9}
      r={5.4}
      fill="none"
      stroke="#455259"
      strokeMiterlimit={10}
    />
    <path
      d="M8.6 5.9c0 1.5-1.2 2.7-2.7 2.7S3.3 7.4 3.3 5.9h5.3z"
      fill="#455259"
    />
  </svg>
);

export default IconConsumption;
