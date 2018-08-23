/**
 *
 * ConsumptionFareDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import FareDetail from '../FareDetail/index';

const ConsumptionFareDetail = ({ fare }) => <FareDetail fare={fare} />;

ConsumptionFareDetail.propTypes = {
  fare: PropTypes.shape({
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object,
    rushValue: PropTypes.number,
    outRushValue: PropTypes.number,
    consumptionUnit: PropTypes.string,
  }).isRequired,

  fare: PropTypes.shape({
    id: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired,
    rushValue: 20.3,
    outRushValue: 123.2,
    rushStartTime: '03:40',
    rushEndTime: '04:50',
    startDate: '2018-03-01',
    endDate: '2018-12-01',
    consumptionUnit: 'MWh',
    timeZone: 'SaoPaulo_America',
  }),
};

export default ConsumptionFareDetail;
