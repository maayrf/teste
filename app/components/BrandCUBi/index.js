/**
 *
 * BrandCUBi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import logoLight from '../../assets/img/logo-light.png';
import logoDark from '../../assets/img/logo-dark.png';
import './style.less';

const getLogo = (type) => {
  switch (type) {
    case 'light':
      return logoLight;
    default:
      return logoDark;
  }
};

const BrandCUBi = ({ type, className, ...restProps }) => (
  <div
    className={className ? `brand-cubi ${className}` : 'brand-cubi'}
    {...restProps}
  >
    <img src={getLogo(type)} alt="Logo CUBi" />
  </div>
);

BrandCUBi.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

export default BrandCUBi;
