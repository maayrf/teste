/**
 *
 * CompanyInfoForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row } from 'antd';
import { compose } from 'redux';

const FormItem = Form.Item;

class CompanyInfoForm extends Component {
  componentDidMount() {
    const { form, companyInfo } = this.props;
    form.validateFields();
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
    const companyInfoData = this.props.companyInfo
      ? { ...this.props.form.getFieldsValue(), id: this.props.companyInfo.id }
      : this.props.form.getFieldsValue();
    this.props.onSubmit(companyInfoData);
    return false;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading } = this.props;
    const Error = this.getError('');

    return (
      <div className="companyInfo-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="companyInfo-form"
        >
          <FormItem
            label=""
            validateStatus={Error ? 'error' : ''}
            help={Error || ''}
          >
            {getFieldDecorator('', {
              rules: [{ required: true, message: 'Please insert a !' }],
            })(<Input placeholder="" />)}
          </FormItem>
          <Row type="flex" justify="end">
            <Button onClick={() => this.handleCancel()}>Cancel</Button>
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {this.props.companyInfo ? 'Edit' : 'Create'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

CompanyInfoForm.propTypes = {
  form: PropTypes.object.isRequired,
  companyInfo: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(CompanyInfoForm);
