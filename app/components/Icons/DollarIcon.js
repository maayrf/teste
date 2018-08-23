import React from 'react';
import PropTypes from 'prop-types';

const DollarIcon = ({ startColor, endColor, ...restProps }) => (
  <svg viewBox="0 0 9.7 18.1" {...restProps}>
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      y1={9.057}
      x2={9.686}
      y2={9.057}
    >
      <stop offset={0} stopColor={startColor} />
      <stop offset={1} stopColor={endColor} />
    </linearGradient>
    <path
      d="M5.5 18.1h-.7c-.2 0-.3-.1-.3-.3V16h-.8c-1.1 0-2-.3-2.7-.8S0 13.9 0 13v-.7c0-.2.1-.3.3-.3h.8c.2 0 .3.1.3.2v.6c0 1.4.9 2.2 2.6 2.2h1.9c1.7 0 2.6-.7 2.6-2.2v-1.3c0-.8-.2-1.3-.7-1.6-.6-.2-1.3-.4-2.2-.4H3.9c-1.2 0-2.2-.3-2.9-.7-.7-.4-1-1.2-1-2.3V5.2C0 4.3.3 3.5 1 3s1.6-.8 2.7-.8h.8V.3c.1-.2.1-.3.3-.3h.6c.2 0 .3.1.3.3v1.9H6c1.1 0 2 .3 2.7.8s1 1.3 1 2.2v.6c-.1.1-.2.2-.3.2h-.8c-.2 0-.3-.1-.3-.2v-.5c0-1.4-.9-2.2-2.6-2.2H3.9c-1.7 0-2.6.7-2.6 2.2v1.2c0 .7.2 1.2.7 1.5.5.3 1.1.4 2.1.5H6c1.1 0 2.1.3 2.7.7.7.4 1 1.2 1 2.3v1.4c0 .9-.3 1.7-1 2.2-.7.6-1.6.9-2.7.9h-.3v1.9c0 .1-.1.2-.2.2z"
      fill="url(#a)"
    />
  </svg>
);
DollarIcon.propTypes = {
  startColor: PropTypes.string,
  endColor: PropTypes.string,
};
DollarIcon.defaultProps = {
  startColor: '#89bccd',
  endColor: '#4da6d2',
};
export default DollarIcon;
