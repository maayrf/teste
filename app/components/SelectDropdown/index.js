/**
 *
 * SelectDropdown
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import './style.less';

const SelectOption = Select.Option;

const renderOptions = (dataSource) =>
  dataSource.map((item, index) => (
    <SelectOption key={index.toString()} value={item.name}>
      {item.name}
    </SelectOption>
  ));

const SelectDropdown = ({ dataSource, ...restProps }) => (
  <Select {...restProps}>{renderOptions(dataSource)}</Select>
);

SelectDropdown.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default SelectDropdown;
