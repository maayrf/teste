/* eslint-disable react/prefer-stateless-function */
/**
 *
 * SelectFareModel
 *
 */

import React, { Component } from 'react';
import './style.less';
import SelectDropdown from '../SelectDropdown/index';

const FARE_MODELS = [
  { name: 'Convencional' },
  { name: 'Horo Sazonal Verde' },
  { name: 'Horo Sazonal Azul' },
  { name: 'Branca' },
  { name: 'Livre' },
];

class SelectFareModel extends Component {
  render() {
    const { props } = this;
    return (
      <div className="select-fare-model">
        <SelectDropdown dataSource={FARE_MODELS} {...props} />
      </div>
    );
  }
}

export default SelectFareModel;
