/**
 *
 * FormItemPhaseTwoAuthentications
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import './style.less';

const FormItem = Form.Item;

const FormItemPassword = ({ getFieldDecorator, passwordError }) => (
  <FormItem
    label="Senha"
    validateStatus={passwordError ? 'error' : ''}
    help={passwordError || ''}
  >
    {getFieldDecorator('password', {
      rules: [{ required: true, message: 'Insira a Senha!' }],
    })(<Input type="password" placeholder="*****" />)}
  </FormItem>
);

FormItemPassword.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  passwordError: PropTypes.func,
};

export default FormItemPassword;
