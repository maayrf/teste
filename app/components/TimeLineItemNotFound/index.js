/**
 *
 * TimeLineItemNotFound
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Alert } from 'antd';
import './style.less';
import DatesInterval from '../DatesInterval/index';

const TimeLineItemNotFound = ({
  startDate, endDate, children, noStyle,
}) => {
  const message = (
    <Row>
      {children}
      <h3>
        <DatesInterval startDate={startDate} endDate={endDate} />
      </h3>
    </Row>
  );
  const style = noStyle ? { background: 'none', border: 'none' } : {};
  return <Alert style={style} message={message} type="warning" showIcon />;
};

TimeLineItemNotFound.defaultProps = {
  noStyle: false,
};
TimeLineItemNotFound.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object,
  noStyle: PropTypes.bool,
};

export default TimeLineItemNotFound;
