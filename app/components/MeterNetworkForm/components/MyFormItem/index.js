/**
 *
 * MyFormItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import './style.less';

const FormItem = Form.Item;

const MyFormItem = ({
  getFieldDecorator,
  dataError,
  label,
  keyName,
  options,
  children,
}) => (
  <FormItem
    label={label}
    validateStatus={dataError ? 'error' : ''}
    help={dataError || ''}
  >
    {getFieldDecorator(keyName, options)(children)}
  </FormItem>
);

MyFormItem.defaultProps = {
  options: PropTypes.shape({
    rules: [{ required: true, message: 'Insert info!' }],
  }),
};

MyFormItem.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
  dataError: PropTypes.array,
  options: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default MyFormItem;
