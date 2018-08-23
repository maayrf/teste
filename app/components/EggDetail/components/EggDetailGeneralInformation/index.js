/**
 *
 * MeterDetailGeneralInformation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import EggFormContainer from '../../../../containers/EggFormContainer';

const EggDetailGeneralInformation = ({ egg, className }) => (
  <div className={`meter-detail-general-information ${className}`}>
    <EggFormContainer egg={egg} />
  </div>
);

EggDetailGeneralInformation.propTypes = {
  egg: PropTypes.object.isRequired,
  className: PropTypes.string,
};

EggDetailGeneralInformation.defaultProps = {
  className: '',
};

export default EggDetailGeneralInformation;
