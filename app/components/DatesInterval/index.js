/**
 *
 * DatesInterval
 *
 */

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './style.less';

const DatesInterval = ({ startDate, endDate }) => {
  if (!endDate) {
    return (
      <span>
        <small> a partir de:</small> {startDate.format('DD/MM/YYYY')}
      </span>
    );
  }
  return (
    <span>
      <small> de </small>
      {startDate.format('DD/MM/YYYY')} <small>até</small>{' '}
      {endDate.format('DD/MM/YYYY')}
    </span>
  );
};

DatesInterval.propTypes = {
  // startDate: PropTypes.object.isRequired,
  // endDate: PropTypes.object,  //
  startDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  endDate: PropTypes.object,
};

export default DatesInterval;
