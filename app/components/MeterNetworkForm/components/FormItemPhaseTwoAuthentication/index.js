/**
 *
 * FormItemPhaseTwoAuthentications
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import './style.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;

const FormItemPhaseTwoAuthentications = ({
  getFieldDecorator,
  phaseTwoAuthenticationsError,
  data,
  initialValue,
}) => (
  <FormItem
    label="Autenticação de Fase 2"
    validateStatus={phaseTwoAuthenticationsError ? 'error' : ''}
    help={phaseTwoAuthenticationsError || ''}
  >
    {getFieldDecorator('phaseTwoAuthentication', {
      initialValue,
      rules: [{ required: true, message: 'Insira a Autenticação de Fase 2!' }],
    })(<Select>
      {data.map(({ label, key }) => (
        <SelectOption key={key} value={key}>
          {label}
        </SelectOption>
      ))}
    </Select>)}
  </FormItem>
);

FormItemPhaseTwoAuthentications.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  phaseTwoAuthenticationsError: PropTypes.func,
  data: PropTypes.array.isRequired,
  initialValue: PropTypes.string,
};

export default FormItemPhaseTwoAuthentications;
