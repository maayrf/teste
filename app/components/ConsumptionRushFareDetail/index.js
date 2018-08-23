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

const ConsumptionRushFareDetail = ({ consumptionFare }) => {
  if (!consumptionFare || !objectHasIndex(consumptionFare)) {
    return <strong>-----------</strong>;
  }
  const { rushValue, startDate, consumptionUnit } = consumptionFare;
  return (
    <Row type="flex" align="middle" gutter={7}>
      <strong>
        {formatToDecimal(rushValue)} R$ {consumptionUnit}
      </strong>
      desde
      <strong>{startDate.format('DD/MM/YYYY')}</strong>
    </Row>
  );
};

ConsumptionRushFareDetail.propTypes = {
  consumptionFare: PropTypes.shape({
    rushValue: PropTypes.number,
    rushStartTime: PropTypes.any,
    rushEndTime: PropTypes.any,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    consumptionUnit: PropTypes.string,
  }),
};

export default ConsumptionRushFareDetail;
