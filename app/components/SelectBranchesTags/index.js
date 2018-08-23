/**
 *
 * SelectBranchesTags
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select, Spin } from 'antd';
import './style.less';

const SelectOption = Select.Option;

const renderOptions = (branches, myBranchesIds = []) =>
  branches.reduce((prev, { id, tradename }) => {
    if (myBranchesIds.indexOf(id) < 0) {
      prev.push(<SelectOption key={id} value={id.toString()}>
        {tradename}
      </SelectOption>);
    }
    return prev;
  }, []);

const SelectBranchesTags = ({
  branches,
  currentValue,
  fetchBranches,
  onChange,
  myBranchesIds,
  value,
  ...restProps
}) => (
  <Select
    mode="multiple"
    labelInValue
    value={currentValue || value}
    placeholder="Selecione uma unidade"
    notFoundContent={branches ? <Spin /> : 'Sem Resultado'}
    filterOption={false}
    onSearch={fetchBranches}
    onChange={onChange}
    style={{ width: '100%' }}
    {...restProps}
  >
    {renderOptions(branches, myBranchesIds)}
  </Select>
);

SelectBranchesTags.propTypes = {
  branches: PropTypes.array.isRequired,
  currentValue: PropTypes.string.isRequired,
  fetchBranches: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  myBranchesIds: PropTypes.array,
};

export default SelectBranchesTags;
