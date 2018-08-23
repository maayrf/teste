/**
 *
 * InputDecimalNumberGroupWithPrefix
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber } from 'antd';
import './style.less';

const InputGroup = Input.Group;

class InputDecimalNumberGroupWithPrefix extends Component {
  render() {
    const { prefix, ...restProps } = this.props;
    return (
      <InputGroup className="input-number-group-with-prefix" compact>
        <Input className="prefix" value={prefix} disabled />
        <InputNumber placeholder="0" style={{ width: '100%' }} {...restProps} />
      </InputGroup>
    );
  }
}

InputDecimalNumberGroupWithPrefix.propTypes = {
  prefix: PropTypes.string.isRequired,
  step: PropTypes.number,
};

export default InputDecimalNumberGroupWithPrefix;
