/* eslint-disable consistent-return, */
/* eslint-disable react/jsx-closing-tag-location */

/**
 *
 * GeneralInformationForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { compose } from 'redux';
import SelectSubDepartment from './components/SelectSubDepartment/index';
import CompaniesSelectContainer from '../../containers/CompaniesSelectContainer';
import {
  DEPARTMENTS_OPTIONS,
  OTHER,
  SUBDEPARTMENTS_OPTIONS,
} from './constants';
import TelephoneNumberInput from '../TelephoneNumberInput';

const FormItem = Form.Item;
const SelectiOption = Select.Option;

class GeneralInformationForm extends Component {
  state = {
    selectedDepartment: '',
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  }
  getSubDepartments = () => {
    const subDepartments =
      SUBDEPARTMENTS_OPTIONS[this.props.form.getFieldValue('department')];
    return subDepartments || [];
  };

  getInitialValue = (field) => {
    if (!this.props.branchDetails) {
      return null;
    }
    const {
      branchDetails: {
        tradename,
        cnpj,
        cnae,
        employees,
        address,
        contact,
        department,
        subDepartment,
      },
    } = this.props;
    const branchDataForm = {
      tradename,
      cnpj,
      cnae,
      employees,
      department,
      subDepartment,
      ...address,
      ...contact,
    };
    return branchDataForm[field] || null;
  };
  hasErrors() {
    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some((key) => errors[key]);
  }
  handleSelectDepartment = () => {
    this.props.form.setFieldsValue({ subDepartment: null });
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    const generalInformationData = this.props.generalInformation
      ? {
        ...this.props.form.getFieldsValue(),
        id: this.props.generalInformation.id,
      }
      : this.props.form.getFieldsValue();
    this.props.onSubmit(generalInformationData);
    return false;
  };
  renderCompanyFormItem = () => {
    const { getInitialValue } = this;
    const companyIdError = this.getError('companyId');
    const { getFieldDecorator } = this.props.form;
    const {
      currentUser: { role },
    } = this.props;

    return role === 'root' ? (
      <FormItem
        validateStatus={companyIdError ? 'error' : ''}
        help={companyIdError || ''}
        label="Empresa"
      >
        {getFieldDecorator('companyId', {
          initialValue: getInitialValue('companyId'),
          rules: [
            {
              required: true,
              message: 'Insira uma Empresa!!',
            },
          ],
        })(<CompaniesSelectContainer />)}
      </FormItem>
    ) : (
      ''
    );
  };
  renderButtons = () => {
    const { loading } = this.props;
    const subDepartment = this.props.form.getFieldValue('subDepartment');
    const department = this.props.form.getFieldValue('department');

    const valid = !this.hasErrors() && !!subDepartment && !!department;
    return (
      <Row type="flex" justify="end">
        <Button onClick={this.props.onCancel}>Cancelar</Button>
        <Button
          loading={loading}
          disabled={!valid}
          onClick={() => this.handleSubmit()}
          type="primary"
        >
          Salvar
        </Button>
      </Row>
    );
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const tradenameError = this.getError('tradename');
    const cnpjError = this.getError('cnpj');
    const cnaeError = this.getError('cnae');
    const employeesError = this.getError('employees');
    const postcodeError = this.getError('postcode');
    const streetNameError = this.getError('streetName');
    const streetNumberError = this.getError('streetNumber');
    const districtError = this.getError('district');
    const stateError = this.getError('state');
    const cityError = this.getError('city');
    const nameError = this.getError('name');
    const phoneError = this.getError('phone');
    const emailError = this.getError('email');
    const departmentError = this.getError('department');
    const subDepartmentError = this.getError('subDepartment');
    const subDepartments = this.getSubDepartments();

    return (
      <div className="generalInformation-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="generalInformation-form"
        >
          <Row type="flex" gutter={20}>
            <Col sm={24} lg={10}>
              {this.renderCompanyFormItem()}
              <FormItem
                validateStatus={tradenameError ? 'error' : ''}
                help={tradenameError || ''}
                label="Nome Comercial"
              >
                {getFieldDecorator('tradename', {
                  initialValue: this.getInitialValue('tradename'),
                  rules: [
                    { required: true, message: 'Informar nome comercial!' },
                  ],
                })(<Input
                  autoComplete="branch-tradename"
                  placeholder="Nome da Unidade"
                />)}
              </FormItem>
            </Col>
            <Col sm={12} lg={7}>
              <FormItem
                validateStatus={cnpjError ? 'error' : ''}
                help={cnpjError || ''}
                label="CNPJ"
              >
                {getFieldDecorator('cnpj', {
                  initialValue: this.getInitialValue('cnpj'),
                  rules: [{ required: true, message: 'Informar CNPJ!' }],
                })(<Input placeholder="Cnpj" />)}
              </FormItem>
            </Col>
            <Col sm={12} lg={7}>
              <FormItem
                validateStatus={cnaeError ? 'error' : ''}
                help={cnaeError || ''}
                label="CNAE"
              >
                {getFieldDecorator('cnae', {
                  initialValue: this.getInitialValue('cnae'),
                  rules: [{ required: true, message: 'Informar CNAE!' }],
                })(<Input placeholder="Cnae" />)}
              </FormItem>
            </Col>
            <Col sm={12} lg={5}>
              <FormItem
                validateStatus={employeesError ? 'error' : ''}
                help={employeesError || ''}
                label="Quantidade de funcionários"
              >
                {getFieldDecorator('employees', {
                  initialValue: this.getInitialValue('employees'),
                  rules: [
                    {
                      required: true,
                      message: 'Informe quantidade de funcionários!',
                    },
                  ],
                })(<InputNumber
                  autoComplete="branch-employees"
                  placeholder="0"
                  min={0}
                />)}
              </FormItem>
            </Col>

            <Col span={24}>
              <h2 className="_page-title">Endereço</h2>
            </Col>
            <Col sm={12} lg={7}>
              <FormItem
                validateStatus={postcodeError ? 'error' : ''}
                help={postcodeError || ''}
                label="CEP"
              >
                {getFieldDecorator('postcode', {
                  initialValue: this.getInitialValue('postcode'),
                  rules: [{ required: true, message: 'Informe o CEP!' }],
                })(<Input autoComplete="branch-cep" placeholder="CEP" />)}
              </FormItem>
            </Col>
            <Col sm={12} lg={10}>
              <FormItem
                validateStatus={streetNameError ? 'error' : ''}
                help={streetNameError || ''}
                label="Logradouro"
              >
                {getFieldDecorator('streetName', {
                  initialValue: this.getInitialValue('streetName'),
                  rules: [{ required: true, message: 'Informar nome da rua!' }],
                })(<Input
                  autoComplete="branch-streetName"
                  placeholder="Logradouro"
                />)}
              </FormItem>
            </Col>
            <Col sm={12} lg={7}>
              <FormItem
                validateStatus={streetNumberError ? 'error' : ''}
                help={streetNumberError || ''}
                label="Número"
              >
                {getFieldDecorator('streetNumber', {
                  initialValue: this.getInitialValue('streetNumber'),
                  rules: [
                    {
                      required: true,
                      message: 'Informar número da rua!',
                    },
                  ],
                })(<Input
                  autoComplete="branch-streetNumber"
                  placeholder="Street Number"
                />)}
              </FormItem>
            </Col>
            <Col sm={24} lg={12}>
              <FormItem
                validateStatus={districtError ? 'error' : ''}
                help={districtError || ''}
                label="Bairro"
              >
                {getFieldDecorator('district', {
                  initialValue: this.getInitialValue('district'),
                  rules: [{ required: true, message: 'Inserir bairro!' }],
                })(<Input autoComplete="branch-district" placeholder="Bairro" />)}
              </FormItem>
            </Col>
            <Col sm={24} lg={12}>
              <FormItem
                validateStatus={stateError ? 'error' : ''}
                help={stateError || ''}
                label="Estado"
              >
                {getFieldDecorator('state', {
                  initialValue: this.getInitialValue('state'),
                  rules: [{ required: true, message: 'Inserir estado!' }],
                })(<Input autoComplete="branch-state" placeholder="Estado" />)}
              </FormItem>
            </Col>
            <Col sm={24} lg={12}>
              <FormItem
                validateStatus={cityError ? 'error' : ''}
                help={cityError || ''}
                label="Cidade"
              >
                {getFieldDecorator('city', {
                  initialValue: this.getInitialValue('city'),
                  rules: [{ required: true, message: 'Inserir cidade!' }],
                })(<Input autoComplete="branch-city" placeholder="City" />)}
              </FormItem>
            </Col>

            <Col span={24}>
              <h2 className="_page-title">Contato</h2>
            </Col>
            <Col sm={24} lg={10}>
              <FormItem
                validateStatus={nameError ? 'error' : ''}
                help={nameError || ''}
                label="Nome de contato"
              >
                {getFieldDecorator('name', {
                  initialValue: this.getInitialValue('name'),
                  rules: [
                    {
                      required: true,
                      message: 'Inserir nome de contato!',
                    },
                  ],
                })(<Input
                  autoComplete="branch-name"
                  placeholder="Nome de contato"
                />)}
              </FormItem>
            </Col>
            <Col sm={24} lg={6}>
              <FormItem
                validateStatus={phoneError ? 'error' : ''}
                help={phoneError || ''}
                label="Telefone de contato"
              >
                {getFieldDecorator('phone', {
                  initialValue: this.getInitialValue('phone'),
                  rules: [
                    {
                      required: true,
                      message: 'Inserir telefone de contato!',
                    },
                  ],
                })(<TelephoneNumberInput
                  autoComplete="branch-phone"
                  placeholder="Número de contato"
                />)}
              </FormItem>
            </Col>
            <Col sm={24} lg={8}>
              <FormItem
                validateStatus={emailError ? 'error' : ''}
                help={emailError || ''}
                label="E-mail de contato"
              >
                {getFieldDecorator('email', {
                  initialValue: this.getInitialValue('email'),
                  rules: [
                    {
                      required: true,
                      type: 'email',
                      message: 'Inserir e-mail de contato!',
                    },
                  ],
                })(<Input
                  autoComplete="branch-email"
                  placeholder="nome@email.com"
                />)}
              </FormItem>
            </Col>

            <Col span={24}>
              <h2 className="_page-title">Operação</h2>
            </Col>
            <Col sm={24} lg={12}>
              <FormItem
                validateStatus={departmentError ? 'error' : ''}
                help={departmentError || ''}
                label="Setor"
              >
                {getFieldDecorator('department', {
                  initialValue: this.getInitialValue('department'),
                  rules: [{ required: true, message: 'Inserir setor!' }],
                })(<Select
                  showSearch
                  placeholder="Selecione um setor"
                  optionFilterProp="children"
                  onChange={this.handleSelectDepartment}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <SelectiOption value={null}>
                      Selecione um Setor
                  </SelectiOption>
                  {DEPARTMENTS_OPTIONS.map((item) => (
                    <SelectiOption key={item.id} value={item.id}>
                      {item.name}
                    </SelectiOption>
                  ))}
                </Select>)}
              </FormItem>
            </Col>
            <Col sm={24} lg={12}>
              <FormItem
                validateStatus={subDepartmentError ? 'error' : ''}
                help={subDepartmentError || ''}
                label="Segmento"
              >
                {getFieldDecorator('subDepartment', {
                  initialValue: this.getInitialValue('subDepartment'),
                  rules: [
                    {
                      required: true,
                      message: 'Inserir segmento!',
                    },
                  ],
                })(this.props.form.getFieldValue('department') !== OTHER ? (
                  <SelectSubDepartment subDepartments={subDepartments} />
                ) : (
                  <Input />
                ))}
              </FormItem>
            </Col>
          </Row>
          {this.renderButtons()}
        </Form>
      </div>
    );
  }
}

GeneralInformationForm.propTypes = {
  form: PropTypes.object.isRequired,
  generalInformation: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  branchDetails: PropTypes.object,
  currentUser: PropTypes.object,
};
GeneralInformationForm.defaultProps = {
  onCancel: () => {},
  currentUser: { role: 'user' },
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(GeneralInformationForm);
