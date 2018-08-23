import React from 'react';
import PropTypes from 'prop-types';
import './styles/trend-indicator.less';
import TrendIcon from '../../../TrendIcon';
import { formatToDecimal } from '../../../../utils/formatNumber';

const TrendIndicator = ({ trendValue }) => (
  <div className="trend-indicator">
    <h3>
      <span className="trend-icon-value">
        <TrendIcon value={trendValue} />
        <span className="trend-value">
          {formatToDecimal(100 * trendValue)}%
        </span>
      </span>
      Tendência de consumo em relação ao mês anterior
    </h3>
  </div>
);

TrendIndicator.propTypes = {
  trendValue: PropTypes.number,
};

export default TrendIndicator;
