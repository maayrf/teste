import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';
import Loading from '../Loading';
import './style.less';

const { Option } = Select;

const CompaniesSelect = ({
  companies, loading, className, ...restProps
}) => (
  <Select className={`companies-select ${className}`} {...restProps}>
    <Option value={null}>
      {loading ? <Loading /> : 'Selecione uma empresa'}
    </Option>
    {companies.map(({ id, tradename }) => (
      <Option key={id} value={id}>
        {tradename}
      </Option>
    ))}
  </Select>
);

CompaniesSelect.defaultProps = {
  className: '',
};

CompaniesSelect.propTypes = {
  companies: PropTypes.array,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default CompaniesSelect;
