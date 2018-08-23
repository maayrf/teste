/**
 *
 * InputDecimalNumberGroupWithPrefix
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import InputDecimalNumber from '../InputDecimalNumber/index';
import './style.less';

const InputGroup = Input.Group;

class InputDecimalNumberGroupWithPrefix extends Component {
  render() {
    const { prefix, ...restProps } = this.props;
    return (
      <InputGroup className="input-decimal-number-group-with-prefix" compact>
        <Input className="prefix" value={prefix} disabled />
        <InputDecimalNumber placeholder="0" {...restProps} />
      </InputGroup>
    );
  }
}

InputDecimalNumberGroupWithPrefix.propTypes = {
  prefix: PropTypes.string.isRequired,
  step: PropTypes.number,
};

export default InputDecimalNumberGroupWithPrefix;
