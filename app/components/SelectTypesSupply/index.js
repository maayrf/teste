/* eslint-disable react/prefer-stateless-function */
/**
 *
 * SelectTypesSupply
 *
 */

import React, { Component } from 'react';
import SelectDropdown from '../SelectDropdown/index';
import './style.less';

const TYPES_SUPPLY = [
  {
    name: 'Mercado Livre',
    id: 1,
  },
  {
    name: 'Mercado Cativo',
    id: 2,
  },
  {
    name: 'Geração própria',
    id: 3,
  },
];

class SelectTypesSupply extends Component {
  render() {
    const { props } = this;
    return (
      <div className="select-types-supply">
        <SelectDropdown dataSource={TYPES_SUPPLY} {...props} />
      </div>
    );
  }
}

export default SelectTypesSupply;
