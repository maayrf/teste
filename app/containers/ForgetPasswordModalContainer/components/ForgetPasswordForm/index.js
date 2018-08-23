/**
 *
 * ForgetPasswordForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row } from 'antd';
import { compose } from 'redux';

const FormItem = Form.Item;

class ForgetPasswordForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }
  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  }
  hasErrors() {
    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some((key) => errors[key]);
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    const resetPasswordData = this.props.form.getFieldsValue();
    this.props.onSubmit(resetPasswordData);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading } = this.props;
    const emailError = this.getError('email');

    return (
      <div className="resetPassword-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="resetPassword-form"
        >
          <FormItem
            validateStatus={emailError ? 'error' : ''}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Por favor, digite um e-mail válido!',
                },
                { required: true, message: 'Por favor, preencha um e-mail!' },
              ],
            })(<Input placeholder="Email" />)}
          </FormItem>
          <Row type="flex" justify="end">
            <Button onClick={() => this.handleCancel()}>Cancelar</Button>
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              Confirmar
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

ForgetPasswordForm.propTypes = {
  form: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(ForgetPasswordForm);
