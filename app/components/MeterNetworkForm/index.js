/**
 *
 * MeterNetworkForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { compose } from 'redux';
import {
  CAN_SEE_CERTIFICATE_CA,
  CAN_SEE_IDENTITY,
  CAN_SEE_IDENTITY_ANONYMOUS,
  CAN_SEE_PASSWORD,
  CAN_SEE_PHASE_TWO_AUTHENTICATIONS,
  CAN_SEE_PROVISIONING,
  ENTERPRISE,
  EPA_METHODS,
  NONE,
  PHASE_TWO_AUTHENTICATIONS_OPTIONS,
  PROVISIONS,
  SECURITY_PROTOCOLS,
  VALID_TYPE_FILE_CERTIFICATE_CA,
} from '../../containers/MeterNetworkFormContainer/constants';
import FormItemPhaseTwoAuthentications from './components/FormItemPhaseTwoAuthentication/index';
import MyFormItem from './components/MyFormItem';
import InputFile from '../InputFile';
import './style.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;

class MeterNetworkForm extends Component {
  componentDidMount() {
    const { form } = this.props;
    this.prevFormValues = form.getFieldsValue();
    form.validateFields();
  }
  componentDidUpdate() {
    const { securityProtocol, EPAMethod } = this.props.form.getFieldsValue();
    const {
      securityProtocol: prevSecurityProtocol,
      EPAMethod: prevEPAMethod,
    } = this.prevFormValues;
    if (
      securityProtocol !== prevSecurityProtocol ||
      EPAMethod !== prevEPAMethod
    ) {
      this.props.form.validateFields({ force: true });
    }
    this.prevFormValues = this.props.form.getFieldsValue();
  }
  getError = (prop) => {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  };
  handleCancel = () => {
    this.props.onCancel();
  };
  hasErrors() {
    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some((key) => errors[key]);
  }
  convertMeterInFormData = (meterNetworkData) => {
    const formData = new FormData();
    Object.keys(meterNetworkData).forEach((meterNetwork) => {
      formData.set(meterNetwork, meterNetworkData[meterNetwork]);
    });
    return formData;
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    // Get fields value of the form
    let meterNetworkData = this.props.form.getFieldsValue();
    // Verify if have id in prop data and add in data for to send
    if (this.props.meterNetwork.id) {
      meterNetworkData = {
        ...meterNetworkData,
        id: this.props.meterNetwork.id,
      };
    }
    // Convert data in FormData and send
    this.props.onSubmit(this.convertMeterInFormData(meterNetworkData));
    return false;
  };
  showSecurityProtocols = () => (
    <Select>
      {SECURITY_PROTOCOLS.map(({ key, label }) => (
        <SelectOption key={key} value={key}>
          {label}
        </SelectOption>
      ))}
    </Select>
  );
  showEPAMethods = () => (
    <Select>
      {EPA_METHODS.map(({ label, key }) => (
        <SelectOption key={key} value={key}>
          {label}
        </SelectOption>
      ))}
    </Select>
  );
  showFormItemPassword = () => {
    const { securityProtocol, EPAMethod } = this.props.form.getFieldsValue();
    const { getFieldDecorator } = this.props.form;
    const keyName = 'password';
    if (securityProtocol && securityProtocol !== NONE) {
      if (
        (EPAMethod && !CAN_SEE_PASSWORD[EPAMethod]) ||
        (securityProtocol === ENTERPRISE && !EPAMethod)
      ) {
        return;
      }
      return (
        <MyFormItem
          getFieldDecorator={getFieldDecorator}
          dataError={this.getError(keyName)}
          label="Senha"
          keyName={keyName}
          options={{
            rules: [{ required: true, message: 'Insira a Senha!' }],
          }}
        >
          <Input type="password" />
        </MyFormItem>
      );
    }
  };
  showPhaseTwoAuthentications = () => {
    const {
      securityProtocol,
      EPAMethod,
      phaseTwoAuthentication,
    } = this.props.form.getFieldsValue();
    const { getFieldDecorator } = this.props.form;
    if (securityProtocol && securityProtocol !== NONE) {
      if (EPAMethod && CAN_SEE_PHASE_TWO_AUTHENTICATIONS[EPAMethod]) {
        return (
          <FormItemPhaseTwoAuthentications
            getFieldDecorator={getFieldDecorator}
            phaseTwoAuthenticationsError={this.getError('phaseTwoAuthentication')}
            initialValue={phaseTwoAuthentication}
            data={PHASE_TWO_AUTHENTICATIONS_OPTIONS[EPAMethod] || []}
          />
        );
      }
    }
  };
  showFormItemIdentity = () => {
    const { EPAMethod } = this.props.form.getFieldsValue();
    if (EPAMethod && CAN_SEE_IDENTITY[EPAMethod]) {
      const { getFieldDecorator } = this.props.form;
      const identityError = this.getError('identity');
      return (
        <FormItem
          label="Identidade"
          validateStatus={identityError ? 'error' : ''}
          help={identityError || ''}
        >
          {getFieldDecorator('identity', {
            rules: [{ required: true, message: 'Insira a Identidade!' }],
          })(<Input />)}
        </FormItem>
      );
    }
  };
  showFormItemIdentityAnonymous = () => {
    const { EPAMethod } = this.props.form.getFieldsValue();
    const { getFieldDecorator } = this.props.form;
    const keyName = 'identityAnonymous';
    if (EPAMethod && CAN_SEE_IDENTITY_ANONYMOUS[EPAMethod]) {
      return (
        <MyFormItem
          getFieldDecorator={getFieldDecorator}
          label="Identidade Anônima"
          keyName={keyName}
          dataError={this.getError(keyName)}
          options={{
            rules: [
              { required: true, message: 'Insira a Identidade Anônima!' },
            ],
          }}
        >
          <Input />
        </MyFormItem>
      );
    }
  };
  showProvisioning = () => {
    const { EPAMethod, provisioning } = this.props.form.getFieldsValue();
    const { getFieldDecorator } = this.props.form;
    const keyName = 'provisioning';
    if (EPAMethod && CAN_SEE_PROVISIONING[EPAMethod]) {
      return (
        <MyFormItem
          getFieldDecorator={getFieldDecorator}
          label="Provisionamento"
          keyName={keyName}
          dataError={this.getError(keyName)}
          options={{
            initialValue: provisioning,
            rules: [{ required: true, message: 'Insira o Provisionamento!' }],
          }}
        >
          <Select>
            {PROVISIONS.map(({ label, key }) => (
              <SelectOption key={key} value={key}>
                {label}
              </SelectOption>
            ))}
          </Select>
        </MyFormItem>
      );
    }
  };
  showFormItemCertificateCA = () => {
    const { EPAMethod } = this.props.form.getFieldsValue();
    const { getFieldDecorator } = this.props.form;
    if (EPAMethod && CAN_SEE_CERTIFICATE_CA[EPAMethod]) {
      const certificateCAError = this.getError('certificateCA');
      return (
        <FormItem
          label="Certificado CA"
          validateStatus={certificateCAError ? 'error' : ''}
          help={certificateCAError || ''}
        >
          {getFieldDecorator('certificateCA', {
            initialValue: { path: null, file: null },
            rules: [
              {
                required: true,
                validator: (rule, { file }, cb) => {
                  if (file instanceof File) {
                    const isValidType = VALID_TYPE_FILE_CERTIFICATE_CA.includes(file.type);
                    if (!isValidType) {
                      cb('Por favor insira um arquivo de Certificado');
                    } else {
                      cb();
                    }
                  } else {
                    cb('Insira o Certificado CA!');
                  }
                },
              },
            ],
          })(<InputFile className="input-certificate-ca" />)}
        </FormItem>
      );
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    const { securityProtocol, EPAMethod } = this.props.form.getFieldsValue();
    const securityProtocolsError = this.getError('securityProtocol');
    const nameNetworkError = this.getError('nameNetwork');
    const passwordError = this.getError('password');
    const EPAMethodsError = this.getError('EPAMethod');

    return (
      <div className="meter-network-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="meterNetwork-form"
        >
          <FormItem
            label="Protocolo de Segurança"
            validateStatus={securityProtocolsError ? 'error' : ''}
            help={securityProtocolsError || ''}
          >
            {getFieldDecorator('securityProtocol', {
              initialValue: securityProtocol,
              rules: [
                { required: true, message: 'Insira o Protocolo de Segurança!' },
              ],
            })(this.showSecurityProtocols())}
          </FormItem>
          {securityProtocol === 'ENTERPRISE' && (
            <FormItem
              label="Método EPA"
              validateStatus={EPAMethodsError ? 'error' : ''}
              help={EPAMethodsError || ''}
            >
              {getFieldDecorator('EPAMethod', {
                initialValue: EPAMethod,
                rules: [{ required: true, message: 'Insira o Método EPA!' }],
              })(this.showEPAMethods())}
            </FormItem>
          )}
          {this.showPhaseTwoAuthentications()}
          {this.showProvisioning()}
          <MyFormItem
            getFieldDecorator={getFieldDecorator}
            label="Nome da Rede"
            keyName="nameNetwork"
            dataError={nameNetworkError}
            options={{
              rules: [{ required: true, message: 'Insira o Nome da Rede!' }],
            }}
          >
            <Input />
          </MyFormItem>
          {this.showFormItemPassword(getFieldDecorator, passwordError)}
          {this.showFormItemIdentity()}
          {this.showFormItemIdentityAnonymous()}
          {this.showFormItemCertificateCA()}
          <Row type="flex" justify="end" gutter={20}>
            <Col>
              <Button onClick={() => this.handleCancel()}>Cancelar</Button>
            </Col>
            <Col>
              <Button
                loading={loading}
                disabled={this.hasErrors()}
                onClick={() => this.handleSubmit()}
                type="primary"
              >
                {this.props.meterNetwork.id ? 'Salvar' : 'Cadastrar'}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

MeterNetworkForm.defaulProps = {
  meterNetwork: {
    id: null,
    securityProtocol: '',
    EPAMethod: '',
    nameNetwork: '',
    phaseTwoAuthentication: '',
    provisioning: '0',
    password: '',
    identity: '',
    identityAnonymous: '',
    certificateCA: '',
  },
};

MeterNetworkForm.propTypes = {
  form: PropTypes.object.isRequired,
  meterNetwork: PropTypes.shape({
    id: PropTypes.number,
    securityProtocol: PropTypes.string,
    EPAMethod: PropTypes.string,
    nameNetwork: PropTypes.string,
    phaseTwoAuthentication: PropTypes.string,
    provisioning: PropTypes.string,
    password: PropTypes.string,
    identity: PropTypes.string,
    identityAnonymous: PropTypes.string,
    certificateCA: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(MeterNetworkForm);
