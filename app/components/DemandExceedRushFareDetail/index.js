/**
 *
 * ConsumptionFareDetail
 *
 */

import React from 'react';
import { Row } from 'antd';
import PropTypes from 'prop-types';
import './style.less';
import { objectHasIndex } from '../../utils/objectHasIndex';
import { formatToDecimal } from '../../utils/formatNumber';

const DemandExceedRushFareDetail = ({ demandExceedFare }) => {
  if (!demandExceedFare || !objectHasIndex(demandExceedFare)) {
    return <strong>-----------</strong>;
  }
  const { outRushValue, startDate, consumptionUnit } = demandExceedFare;
  return (
    <Row type="flex" align="middle" gutter={7}>
      <strong>
        {formatToDecimal(outRushValue)} R$ {consumptionUnit}
      </strong>
      desde
      <strong>{startDate.format('DD/MM/YYYY')}</strong>
    </Row>
  );
};

DemandExceedRushFareDetail.propTypes = {
  demandExceedFare: PropTypes.shape({
    outRushValue: PropTypes.number.isRequired,
    rushStartTime: PropTypes.any,
    rushEndTime: PropTypes.any,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    consumptionUnit: PropTypes.string.isRequired,
  }),
};

export default DemandExceedRushFareDetail;
