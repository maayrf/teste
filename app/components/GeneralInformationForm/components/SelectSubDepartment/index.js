/**
 *
 * SelectSubDepartment
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import './style.less';
import { OTHER } from '../../constants';

const SelectOption = Select.Option;

class SelectSubDepartment extends Component {
  state = {
    otherOption: '',
    selectedOption: this.props.value || '',
  };
  // static getDerivedStateFromProps(nextProps) {
  //   const { value, subDepartments } = nextProps;
  //   if (value === null) {
  //     return {};
  //   }
  //   const selectedValueExist = subDepartments.some((sub) => sub.id === value);
  //   if (!selectedValueExist) {
  //     return {
  //       // selectedOption: OTHER,
  //     };
  //   }
  //   return {
  //     // selectedOption: value,
  //   };
  // }

  componentDidUpdate(prevProps) {
    if (
      prevProps.subDepartments.length &&
      prevProps.subDepartments.length !== this.props.subDepartments.length
    ) {
      this.setState({
        selectedOption: '',
      });
    }
  }
  onOtherOptionChange = ({ target: { value: otherOption } }) => {
    console.log(otherOption);
    this.setState(
      {
        otherOption,
      },
      () => {
        // this.handleChange(otherOption);
      }
    );
  };
  onSelectChange = (selectedOption) => {
    if (selectedOption === OTHER) {
      this.setState({ selectedOption });
      return this.props.onChange(null);
    }
    this.setState({ selectedOption }, () => {
      this.handleChange();
    });
  };
  handleChange = () => {
    if (this.isOtherOption()) {
      return this.props.onChange(this.state.otherOption);
    }
    this.props.onChange(this.state.selectedOption);
  };
  isOtherOption = () => this.state.selectedOption === OTHER;
  render() {
    const { subDepartments } = this.props;

    const selectValue = subDepartments.length ? 'Segmento' : 'Setor';
    const emptyOption = (
      <SelectOption key="" value="">
        Selecione um {selectValue}
      </SelectOption>
    );
    return (
      <div>
        <Select
          placeholder="Selecione um segmento"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          value={this.state.selectedOption}
          onChange={this.onSelectChange}
        >
          {emptyOption}
          {subDepartments.map((item) => (
            <SelectOption key={item.id} value={item.id}>
              {item.name}
            </SelectOption>
          ))}
        </Select>
        {this.isOtherOption() && (
          <Input
            onChange={this.onOtherOptionChange}
            value={this.state.otherOption}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

SelectSubDepartment.propTypes = {
  subDepartments: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SelectSubDepartment;
