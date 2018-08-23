/**
 *
 * FareDetail
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import './style.less';
import { formatToDecimal } from '../../utils/formatNumber';
import PropDetail from '../PropDetail/index';
import DatesInterval from '../DatesInterval/index';

class FareDetail extends Component {
  render() {
    const { fare } = this.props;
    const {
      startDate,
      endDate,
      rushValue,
      outRushValue,
      consumptionUnit,
    } = fare;

    const rushPrice = `${formatToDecimal(rushValue)} R$ ${consumptionUnit}`;
    const outRushPrice = `${formatToDecimal(outRushValue)} R$ ${consumptionUnit}`;

    const props = {
      'Tarifa Comum': rushPrice,
      'Tarifa de Ponta': (
        <Row>
          {outRushPrice}
          <DatesInterval startDate={startDate} endDate={endDate} />
        </Row>
      ),
    };

    return (
      <div className="fare-detail">
        <PropDetail props={props} />
      </div>
    );
  }
}

FareDetail.propTypes = {
  fare: PropTypes.shape({
    id: PropTypes.number,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    className: PropTypes.string,
    consumptionUnit: PropTypes.string,
    timeZone: PropTypes.string,
    rushStartTime: PropTypes.object,
    rushEndTime: PropTypes.object,
    rushValue: PropTypes.number,
    outRushValue: PropTypes.number,
  }),
};

export default FareDetail;
