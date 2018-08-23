/**
 *
 * LegendColorBoxByMeter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { generateColors } from '../../utils/generateColors';

const LegendColorBoxByMeter = ({
  width, height, index, typeMeter,
}) => {
  const newWidth = width || 40;
  const newHeight = height || 20;
  let background = generateColors(index);
  if (/^branch/.test(typeMeter) || /^grouping/.test(typeMeter)) {
    background +=
      ' repeating-linear-gradient(45deg,transparent,transparent 5px,rgba(255,255,255,0.2) 5px, rgba(255,255,255,0.2) 10px )';
  }
  return (
    <div className="legend-color-box-by-meter">
      <div
        style={{
          background,
          width: `${newWidth}px`,
          height: `${newHeight}px`,
        }}
      />
    </div>
  );
};

LegendColorBoxByMeter.propTypes = {
  index: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  typeMeter: PropTypes.string,
};

export default LegendColorBoxByMeter;
