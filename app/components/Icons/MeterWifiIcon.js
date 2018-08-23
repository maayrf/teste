import React from 'react';

const MeterWifiIcon = (props) => (
  <svg viewBox="0 0 30.3 49.1" {...props}>
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={4.631}
      y1={36.105}
      x2={25.645}
      y2={36.105}
    >
      <stop offset={0} stopColor="#88bbcb" />
      <stop offset={1} stopColor="#4ca5d1" />
    </linearGradient>
    <path fill="url(#a)" d="M4.6 23.6h21v24.9h-21z" />
    <linearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1={4.631}
      y1={42.103}
      x2={25.645}
      y2={42.103}
    >
      <stop offset={0} stopColor="#7aa6b3" />
      <stop offset={1} stopColor="#4291b7" />
    </linearGradient>
    <path fill="url(#b)" d="M4.6 35.9h21v12.3h-21z" />
    <path
      d="M16.8 17.8c0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6.8 0 1.6.7 1.6 1.6zm0 0M26.4 7.3c-.1 0-.1 0-.2-.1-3-3-6.9-4.6-11.1-4.6C10.9 2.6 7 4.2 4 7.2c0 0-.1.1-.2.1s-.1 0-.2-.1L2.2 5.7l-.1-.1c0-.1 0-.1.1-.2C5.6 1.9 10.2 0 15.1 0S24.6 1.9 28 5.4l.1.1v.1c0 .1 0 .1-.1.2l-1.5 1.5h-.1zM20.4 13.3c-.1 0-.1 0-.2-.1-1.5-1.3-3.3-2.1-5.1-2.1-1.9 0-3.7.7-5.1 2.1-.1.1-.1.1-.2.1s-.1 0-.2-.1l-1.5-1.5c-.1-.1-.1-.1-.1-.2s0-.1.1-.2C10 9.4 12.3 8.5 15 8.5c2.6 0 5 1 6.9 2.8.1.1.1.2 0 .3l-1.5 1.5c.1.1 0 .2 0 .2z"
      fill="#dbe1e5"
    />
    <path
      d="M24.1 48.6h-18C3 48.6.4 46.1.4 42.9V29.3c0-3.1 2.5-5.7 5.7-5.7h18c3.1 0 5.7 2.5 5.7 5.7v13.6c0 3.1-2.6 5.7-5.7 5.7z"
      fill="none"
      stroke="#dbe1e5"
      strokeMiterlimit={10}
    />
  </svg>
);

export default MeterWifiIcon;
