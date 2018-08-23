import React from 'react';

const TetrisIcon = (props) => (
  <svg viewBox="0 0 55.5 68.8" {...props}>
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={39.071}
      y1={71.367}
      x2={-2.72}
      y2={47.64}
    >
      <stop offset={0} stopColor="#f5ea14" />
      <stop offset={1} stopColor="#ffc708" />
    </linearGradient>
    <path fill="url(#a)" d="M41.1 54.5v13.3H1V41.1h13.4v13.4z" />
    <linearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1={49.363}
      y1={69.003}
      x2={29.424}
      y2={17.839}
    >
      <stop offset={0} stopColor="#504088" />
      <stop offset={1} stopColor="#7d639d" />
    </linearGradient>
    <path fill="url(#b)" d="M54.5 41.1v26.7H41.1V54.5H27.7V27.7h13.4v13.4z" />
    <linearGradient
      id="c"
      gradientUnits="userSpaceOnUse"
      x1={6.285}
      y1={38.988}
      x2={32.995}
      y2={1.744}
    >
      <stop offset={0} stopColor="#88bbcb" />
      <stop offset={1} stopColor="#4ca5d1" />
    </linearGradient>
    <path fill="url(#c)" d="M27.7 1v40.1H14.4V27.7H1V14.4h13.4V1z" />
    <path
      fill="none"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M14.4 54.5h13.4v13.4H14.4zM14.4 27.7h13.4v13.4H14.4z"
    />
    <path
      fill="none"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M14.4 14.4h13.4v13.4H14.4zM14.4 1h13.4v13.4H14.4zM1 54.5h13.4v13.4H1zM1 41.1h13.4v13.4H1zM1 14.4h13.4v13.4H1z"
    />
    <path
      fill="none"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M27.7 27.7h13.4v13.4H27.7zM27.7 41.1h13.4v13.4H27.7zM41.1 41.1h13.4v13.4H41.1zM41.1 54.5h13.4v13.4H41.1zM27.7 54.5h13.4v13.4H27.7z"
    />
  </svg>
);

export default TetrisIcon;
