/**
 *
 * PropDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import './style.less';

const PropDetail = ({ props }) => (
  <div className="prop-detail">
    <Row type="flex" gutter={25}>
      {Object.keys(props).map((key) => (
        <div key={key}>
          <h4>{key}</h4>
          <div>{props[key]}</div>
        </div>
      ))}
    </Row>
  </div>
);

PropDetail.propTypes = {
  props: PropTypes.object.isRequired,
};

export default PropDetail;
