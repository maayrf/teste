/**
 *
 * ConsumptionFareDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import FareDetail from '../FareDetail/index';

const DemandExceedFareDetail = ({ fare }) => <FareDetail fare={fare} />;

DemandExceedFareDetail.propTypes = {
  fare: PropTypes.shape({
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object,
    rushValue: PropTypes.number,
    outRushValue: PropTypes.number,
    consumptionUnit: PropTypes.string,
  }).isRequired,
};

export default DemandExceedFareDetail;
