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

const DemandOutRushFareDetail = ({ demandFare }) => {
  if (!demandFare || !objectHasIndex(demandFare)) {
    return <strong>-----------</strong>;
  }
  const { outRushValue, startDate, consumptionUnit } = demandFare;
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

DemandOutRushFareDetail.propTypes = {
  demandFare: PropTypes.shape({
    value: PropTypes.number,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    consumptionUnit: PropTypes.string,
  }),
};

export default DemandOutRushFareDetail;
