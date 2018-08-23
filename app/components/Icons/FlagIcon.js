import React from 'react';
import PropTypes from 'prop-types';

const FlagIcon = ({ startColor, endColor, ...restProps }) => (
  <svg viewBox="0 0 33.9 34.5" {...restProps}>
    <ellipse cx={11.4} cy={31.5} rx={11.4} ry={3} fill="#eaf0f3" />
    <linearGradient
      id="flagIcon"
      gradientUnits="userSpaceOnUse"
      x1={4.381}
      y1={23.283}
      x2={39.711}
      y2={1.202}
    >
      <stop offset={0} stopColor={startColor} />
      <stop offset={1} stopColor={endColor} />
    </linearGradient>
    <path
      d="M33.9 21.3H11.4v-19H34l-6 9.6 5.9 9.4zm0 0"
      fill="url(#flagIcon)"
    />
    <path
      d="M10.8 0c-.3 0-.6.3-.6.6v30.3c0 .3.3.6.6.6s.6-.3.6-.6V.6c0-.3-.3-.6-.6-.6zm0 0"
      fill="#434b60"
    />
  </svg>
);
FlagIcon.propTypes = {
  startColor: PropTypes.string,
  endColor: PropTypes.string,
};
FlagIcon.defaultProps = {
  startColor: '#f6eb16',
  endColor: '#ffc808',
};
export default FlagIcon;
