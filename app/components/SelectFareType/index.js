/* eslint-disable react/prefer-stateless-function */
/**
 *
 * SelectFareType
 *
 */

import React, { Component } from 'react';
import './style.less';
import SelectDropdown from '../SelectDropdown';

const FARE_TYPES = [
  { name: 'A1' },
  { name: 'A2' },
  { name: 'A3' },
  { name: 'A3a' },
  { name: 'A4' },
  { name: 'AS' },
  { name: 'B1' },
  { name: 'B2' },
  { name: 'B3' },
  { name: 'B4' },
  { name: 'Mercado Livre' },
];

class SelectFareType extends Component {
  render() {
    const { props } = this;
    return (
      <div className="select-fare-type">
        <SelectDropdown dataSource={FARE_TYPES} {...props} />
      </div>
    );
  }
}

export default SelectFareType;
