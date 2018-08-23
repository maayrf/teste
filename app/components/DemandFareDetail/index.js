/**
 *
 * DemandFareDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import FareDetail from '../FareDetail/index';

const DemandFareDetail = ({ fare }) => <FareDetail fare={fare} />;

DemandFareDetail.propTypes = {
  fare: PropTypes.shape({
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object,
    value: PropTypes.number,
    consumptionUnit: PropTypes.string,
  }).isRequired,
};

export default DemandFareDetail;
