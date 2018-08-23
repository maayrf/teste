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

const ConsumptionOutRushFareDetail = ({ consumptionFare }) => {
  if (!consumptionFare || !objectHasIndex(consumptionFare)) {
    return <strong>-----------</strong>;
  }
  const { outRushValue, startDate, consumptionUnit } = consumptionFare;
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

ConsumptionOutRushFareDetail.propTypes = {
  consumptionFare: PropTypes.shape({
    outRushValue: PropTypes.number,
    startDate: PropTypes.any,
    consumptionUnit: PropTypes.string,
  }),
};

export default ConsumptionOutRushFareDetail;
