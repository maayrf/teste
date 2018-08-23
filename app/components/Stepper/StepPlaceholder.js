import React from 'react';
import PropTypes from 'prop-types';
import StepBullet from './StepBullet';
import './styles/StepPlaceholder.less';

const StepPlaceholder = ({ rows }) => (
  <div className="StepContent StepPlaceholder">
    <StepBullet value="" />
    <div>
      {Array(rows)
        .fill(1)
        .map((row, i) => (
          <span key={`placeholder${row + i}`} className="text" />
        ))}
    </div>
  </div>
);

StepPlaceholder.defaultProps = {
  rows: 2,
};

StepPlaceholder.propTypes = {
  rows: PropTypes.number,
};

export default StepPlaceholder;
