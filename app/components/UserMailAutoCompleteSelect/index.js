/**
 *
 * UserMailAutoComplete
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Spin } from 'antd';
import { validateEmail } from '../../utils/validation';
const SelectOption = Select.Option;

class UserMailAutoCompleteSelect extends Component {
  onChange = (values) => {
    const newValue = values.filter((value) => validateEmail(value.key));
    this.props.onChange(newValue);
  };
  renderOptions = () => {
    const { users } = this.props;
    return users.map(({ email, name }) => (
      <SelectOption key={email} value={email}>
        {name} {`<${email}>`}
      </SelectOption>
    ));
  };
  render() {
    const {
      loading, onSearch, onChange, ...restProps
    } = this.props;
    return (
      <div className="userMailAutoComplete-list">
        <Select
          mode="multiple"
          labelInValue
          notFoundContent={loading ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={onSearch}
          onChange={this.onChange}
          style={{ width: '100%' }}
          autoComplete="off"
          {...restProps}
        >
          {this.renderOptions()}
        </Select>
      </div>
    );
  }
}

UserMailAutoCompleteSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default UserMailAutoCompleteSelect;
