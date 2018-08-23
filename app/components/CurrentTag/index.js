/**
 *
 * CurrentTag
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const CurrentTag = ({ current, message }) =>
  current ? <h2 className="_uppercase">{message}</h2> : null;

CurrentTag.propTypes = {
  current: PropTypes.bool,
  message: PropTypes.string.isRequired,
};

export default CurrentTag;
