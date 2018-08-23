import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

import './style.less';

const IconEmptyElectric = (props) => (
  <Row type="flex" justify="center">
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 317 184"
      {...props}
      className={`icon-empty-electric ${props.className || ''}`}
    >
      <path
        d="M247.2 87.5H62c-3.5 0-6.4-2.9-6.4-6.4V36.9c0-3.5 2.9-6.4 6.4-6.4h185.1c3.5 0 6.4 2.9 6.4 6.4V81c.1 3.6-2.8 6.5-6.3 6.5zM253.6 51.4h7.9v15.1h-7.9z"
        fill="none"
        stroke="#eaeced"
        strokeMiterlimit={10}
      />
      <defs>
        <path
          className="loading-bar"
          id="a"
          d="M247 83.9H62.1c-1.7 0-3.1-1.4-3.1-3.1V37.2c0-1.7 1.4-3.1 3.1-3.1H247c1.7 0 3.1 1.4 3.1 3.1v43.6c0 1.7-1.4 3.1-3.1 3.1z"
        />
      </defs>
      <clipPath id="b">
        <use xlinkHref="#a" overflow="visible" />
      </clipPath>
      <path clipPath="url(#b)" fill="#fbcc31" d="M59.6 34.1h198v49.7h-198z" />
      <path
        fill="#fbcc31"
        d="M168.2 56.3h-8.8l1.3-13.8-11.8 19.4h8.7l-1.5 13.6 12.1-19.2z"
      />
      <ellipse cx={158.5} cy={116.2} rx={28.4} ry={5.7} fill="#eaeced" />
      <text transform="translate(29.096 152.603)" fontSize={8}>
        {props.text ||
          'Não encontramos nenhum valor com os parâmetros selecionados'}
      </text>
    </svg>
  </Row>
);
IconEmptyElectric.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};
export default IconEmptyElectric;
