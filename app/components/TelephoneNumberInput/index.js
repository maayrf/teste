/**
 *
 * TelephoneNumberInput
 *
 */

import React, { Component } from 'react';
import MaskedInput, { conformToMask } from 'react-text-mask';
import PropTypes from 'prop-types';
import './style.less';

const TELEPHONE_MASK_TEN_NUMBERS = [
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const TELEPHONE_MASK_ELEVEN_NUMBERS = [
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

class TelephoneNumberInput extends Component {
  handleChange = ({ target: { value } }) => {
    const onlyNumber = value.replace(/\(|\)|-|\s|_/gi, '');
    this.props.onChange(onlyNumber);
  };
  render() {
    let mask = TELEPHONE_MASK_TEN_NUMBERS;
    let newValue = this.props.value ? this.props.value : '';
    if (this.props.value && this.props.value.toString().length >= 11) {
      mask = TELEPHONE_MASK_ELEVEN_NUMBERS;
    }
    newValue = conformToMask(newValue, mask, { guide: false }).conformedValue;
    return (
      <MaskedInput
        {...this.props}
        onChange={this.handleChange}
        className="ant-input"
        value={newValue}
        mask={(value) => {
          const onlyNumber = value.replace(/\(|\)|-|\s|_/gi, '');
          if (onlyNumber.length < 11) {
            return TELEPHONE_MASK_TEN_NUMBERS;
          }
          return TELEPHONE_MASK_ELEVEN_NUMBERS;
        }}
      />
    );
  }
}

TelephoneNumberInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
TelephoneNumberInput.defaulProps = {
  onChange: () => {},
  number: null,
};

export default TelephoneNumberInput;
