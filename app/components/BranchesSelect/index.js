/**
 *
 * BranchesSelect
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import './style.less';
import Loading from '../Loading';

const SelectOption = Select.Option;

const BranchesSelect = ({ branches, loading, ...restProps }) => (
  <Select {...restProps}>
    <SelectOption key={0} value={null}>
      {loading ? <Loading /> : 'Selecione uma Unidade'}
    </SelectOption>
    {branches.map((branch) => (
      <SelectOption key={branch.id} value={branch.id}>
        {branch.tradename}
      </SelectOption>
    ))}
  </Select>
);

BranchesSelect.propTypes = {
  branches: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default BranchesSelect;
