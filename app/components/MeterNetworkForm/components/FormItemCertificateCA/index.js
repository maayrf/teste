/**
 *
 * FormItemPhaseTwoAuthentications
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { message, Input } from 'antd';
import MyFormItem from '../MyFormItem';
import './style.less';
import { VALID_TYPE_FILE_CERTIFICATE_CA } from '../../../../containers/MeterNetworkFormContainer/constants';
import InputFile from '../../../InputFile';

const isValidType = (value) => VALID_TYPE_FILE_CERTIFICATE_CA.includes(value);

const handleFile = (event) => {
  const file = event.target.files[0];
  if (isValidType(file.type)) {
    return file;
  }
  message.warning('Arquivo inválido!');
  return null;
};

const FormItemCertificateCA = ({ getFieldDecorator, getError }) => {
  const keyName = 'certificateCA';
  const certificateCAError = getError(keyName);
  return (
    <MyFormItem
      getFieldDecorator={getFieldDecorator}
      label="Certificado de CA"
      keyName={keyName}
      dataError={certificateCAError}
    >
      <InputFile />
    </MyFormItem>
  );
};

FormItemCertificateCA.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  getError: PropTypes.func,
};

export default FormItemCertificateCA;
