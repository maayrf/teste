/* eslint-disable consistent-return */
/**
 *
 * UserForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Select, Form, Input, Row, Col } from 'antd';
import { compose } from 'redux';
import AutocompleteBranches from '../../containers/AutocompleteBranches';
import {
  formatBranchesToForm,
  revertFormattedBranchesOfForm,
} from './formatDataToUserForm';
import ValidateInputEmailContainer from '../../containers/ValidateInputEmailContainer';
import CompaniesSelectContainer from '../../containers/CompaniesSelectContainer';
import TelephoneNumberInput from '../TelephoneNumberInput';
import { ROLES_BY_ROLE } from './constants';
import { ADMIN_ROLE, USER_ROLE } from '../../utils/constants';

const FormItem = Form.Item;
const SelectOption = Select.Option;

class UserForm extends Component {
  componentDidMount() {
    this.prevFormValues = this.props.form.getFieldsValue();
    this.props.form.validateFields();
  }
  componentDidUpdate() {
    const { role } = this.props.form.getFieldsValue();
    if (this.prevFormValues.role !== role) {
      this.props.form.validateFields();
    }
    this.prevFormValues = this.props.form.getFieldsValue();
  }
  getInitialValue = (value) => {
    const { user } = this.props;
    switch (value) {
      case 'branches':
        if (!user) {
          return [];
        }
        return user[value] ? formatBranchesToForm(user[value]) : [];
      case 'email':
        if (!user) {
          return { value: '' };
        }
        return user[value]
          ? { value: user[value], verified: true }
          : { value: '' };
      case 'companyId':
        return user ? user.company.id : null;
      default:
        if (!user) {
          return null;
        }
        return user[value] || null;
    }
  };
  getError = (prop) => {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  };
  hasErrors() {
    const errors = this.props.form.getFieldsError();
    const emailValue = this.props.form.getFieldValue('email');
    const emailVerified = !!(emailValue && emailValue.verified);
    const thereIsSomeErrorOnFields = Object.keys(errors).some((key) => errors[key]);
    return !(!thereIsSomeErrorOnFields && emailVerified);
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    let userData = this.props.form.getFieldsValue();
    if (userData.branches) {
      userData.branches = revertFormattedBranchesOfForm(userData.branches);
    }
    if (this.props.user && this.props.user.id) {
      userData = { ...userData, id: this.props.user.id };
    }
    this.props.onSubmit(userData);
    return false;
  };
  handleCompanyChange = () => {
    this.props.form.setFieldsValue({
      branches: [],
    });
  };
  emailValidator = (rule, { value, error }, cb) => {
    if (!value) {
      cb('Email é um campo requerido');
    }
    if (error) {
      cb(error);
    }
    cb();
  };
  renderSelectRoles = () => {
    const {
      currentUser: { role },
    } = this.props;
    return (
      <Select placeholder="Selecione um perfil">
        <SelectOption key="" value={null}>
          Selecione um Perfil
        </SelectOption>
        {ROLES_BY_ROLE[role].map((role) => (
          <SelectOption key={role.key} value={role.key}>
            {role.value}
          </SelectOption>
        ))}
      </Select>
    );
  };
  renderInputsByRole = () => {
    const { getFieldDecorator } = this.props.form;
    const role = this.props.form.getFieldValue('role');
    const companyIdError = this.getError('companyId');
    switch (role) {
      case ADMIN_ROLE:
        return (
          <div>
            <FormItem
              validateStatus={companyIdError ? 'error' : ''}
              help={companyIdError || ''}
              label="Empresa"
            >
              {getFieldDecorator('companyId', {
                initialValue: this.getInitialValue('companyId'),
                rules: [{ required: true, message: 'Selecione uma empresa!' }],
              })(<CompaniesSelectContainer />)}
            </FormItem>
          </div>
        );
      case USER_ROLE:
        const branchesError = this.getError('branches');
        const companyId = this.props.form.getFieldValue('companyId');
        return (
          <div>
            <FormItem
              validateStatus={companyIdError ? 'error' : ''}
              help={companyIdError || ''}
              label="Empresa"
            >
              {getFieldDecorator('companyId', {
                initialValue: this.getInitialValue('companyId'),
                rules: [{ required: true, message: 'Selecione uma Empresa!' }],
              })(<CompaniesSelectContainer onChange={this.handleCompanyChange} />)}
            </FormItem>
            <FormItem
              validateStatus={branchesError ? 'error' : ''}
              help={branchesError || ''}
              label="Unidades"
            >
              {getFieldDecorator('branches', {
                initialValue: this.getInitialValue('branches'),
                rules: [{ required: true, message: 'Selecione uma unidade!' }],
              })(<AutocompleteBranches filter={{ searchCompanyId: companyId }} />)}
            </FormItem>
          </div>
        );
      default:
        return '';
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { getInitialValue } = this;
    const { loading } = this.props;
    const nameError = this.getError('name');
    const emailError = this.getError('email');
    const roleError = this.getError('role');
    const phoneError = this.getError('phone');
    const positionError = this.getError('position');

    return (
      <div className="user-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
        >
          <FormItem
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
            label="Nome Completo"
          >
            {getFieldDecorator('name', {
              initialValue: getInitialValue('name'),
              rules: [
                {
                  required: true,
                  message: 'Insira o nome!',
                },
              ],
            })(<Input autoComplete="my-user-name" />)}
          </FormItem>
          <FormItem
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              initialValue: getInitialValue('email'),
              rules: [
                {
                  required: true,
                  validator: this.emailValidator,
                },
              ],
            })(<ValidateInputEmailContainer
              placeholder="nome@exemplo.com"
              autoComplete="off"
            />)}
          </FormItem>
          <FormItem
            validateStatus={roleError ? 'error' : ''}
            help={roleError || ''}
            label="Perfil"
          >
            {getFieldDecorator('role', {
              initialValue: getInitialValue('role'),
              rules: [{ required: true, message: 'Insira o perfil!' }],
            })(this.renderSelectRoles())}
          </FormItem>
          {this.renderInputsByRole()}
          <FormItem
            validateStatus={phoneError ? 'error' : ''}
            help={phoneError || ''}
            label="Telefone"
          >
            {getFieldDecorator('phone', {
              initialValue: getInitialValue('phone'),
              rules: [
                {
                  required: true,
                  validator: (rule, value, callback) => {
                    if (!value) {
                      callback('Preencha o telefone!');
                    }
                    if (value && value.length < 10) {
                      callback('Preencha um telefone válido!');
                    }
                    callback();
                  },
                },
              ],
            })(<TelephoneNumberInput />)}
          </FormItem>
          <FormItem
            validateStatus={positionError ? 'error' : ''}
            help={positionError || ''}
            label="Cargo"
          >
            {getFieldDecorator('position', {
              initialValue: getInitialValue('position'),
              rules: [
                {
                  required: true,
                  message: 'Insira o cargo!',
                },
              ],
            })(<Input placeholder="Analista" autoComplete="my-user-position" />)}
          </FormItem>
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
                {this.props.user ? 'Editar' : 'Adicionar'}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

UserForm.propTypes = {
  form: PropTypes.object.isRequired,
  user: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(UserForm);
