import React from 'react';

const BatteryIcon = (props) => (
  <svg viewBox="0 0 30 51.6" {...props}>
    <path
      d="M.5 43.5V8.2c0-2.4 2-4.4 4.4-4.4h20.2c2.4 0 4.4 2 4.4 4.4v35.3c0 2.4-2 4.4-4.4 4.4H4.9c-2.4 0-4.4-2-4.4-4.4z"
      fill="none"
      stroke="#dbe1e5"
      strokeMiterlimit={10}
    />
    <linearGradient
      id="batteryIconGradient"
      gradientUnits="userSpaceOnUse"
      x1={420.172}
      y1={1131.461}
      x2={458.869}
      y2={1131.461}
      gradientTransform="rotate(90 780.085 366.376)"
    >
      <stop offset={0} stopColor="#88bbcb" />
      <stop offset={1} stopColor="#4ca5d1" />
    </linearGradient>
    <path
      d="M3.3 43.1V8.5c0-1.1.9-2.1 2.1-2.1h19.2c1.1 0 2.1.9 2.1 2.1v34.6c0 1.1-.9 2.1-2.1 2.1H5.4c-1.1 0-2.1-1-2.1-2.1z"
      fill="url(#batteryIconGradient)"
    />
    <path fill="#fff" d="M19.4 24.6h-4l.6-6.3-5.4 8.8h4l-.7 6.3z" />
    <path fill="#dbe1e5" d="M12.2 0h5.3v3.8h-5.3zM12.2 47.9h5.3v3.8h-5.3z" />
  </svg>
);

export default BatteryIcon;
