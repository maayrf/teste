import React from 'react';

const CarbonicGasIcon = (props) => (
  <svg viewBox="0 0 72.2 78.3" {...props}>
    <path fill="#dbe1e5" d="M33.5 68.9h-3.3l-1.9 8.9h5.2z" />
    <linearGradient
      id="carbonicGas"
      gradientUnits="userSpaceOnUse"
      x1={36.02}
      y1={68.18}
      x2={44.12}
      y2={68.18}
    >
      <stop offset={0} stopColor="#88bbcb" />
      <stop offset={1} stopColor="#4ca5d1" />
    </linearGradient>
    <path fill="url(#carbonicGas)" d="M36 58.5h3.5l4.6 19.3H36z" />
    <linearGradient
      id="carbonicGasSmoke"
      gradientUnits="userSpaceOnUse"
      x1={19.706}
      y1={43.066}
      x2={52.421}
      y2={-6.662}
    >
      <stop offset={0} stopColor="#dbe1e5" />
      <stop offset={1} stopColor="#fff" />
    </linearGradient>
    <path
      d="M58.8 0c0 6.8-5.4 12.4-12.4 12.9l-34.9 2.5C5 15.8 0 21.1 0 27.4v.1c0 3.5 2.8 6.4 6.5 6.6l42.4 1.8c1.3.1 2.3 1.1 2.3 2.3 0 .5-.4 1-1 1.1l-6.4.8c-4.7.6-8.2 4.5-8.2 9.1v6.2H39v-4.7c0-4.6 3.5-8.5 8.2-9.1l4.3-.5c2.6-.3 4.4-2.8 3.7-5.3-.7-2.3-2.9-4.2-5.8-4.2l-40.8-.3c-1.2-.1-2.1-1-2.1-2.1 0-3.5 2.8-6.4 6.4-6.7l46.9-2.9c7-.4 12.5-6.1 12.5-12.9V0H58.8z"
      fill="url(#carbonicGasSmoke)"
    />
    <path
      fill="none"
      stroke="#dbe1e5"
      strokeMiterlimit={10}
      d="M20.4 77.8h32.2"
    />
  </svg>
);

export default CarbonicGasIcon;
