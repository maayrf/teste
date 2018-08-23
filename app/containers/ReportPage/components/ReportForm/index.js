/**
 *
 * ReportForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row } from 'antd';
import { compose } from 'redux';

const FormItem = Form.Item;

class ReportForm extends Component {
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    const reportData = this.props.report
      ? { ...this.props.form.getFieldsValue(), id: this.props.report.id }
      : this.props.form.getFieldsValue();
    this.props.onSubmit(reportData);
    return false;
  };

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

  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading } = this.props;
    const nameError = this.getError('name');
    const apportmentError = this.getError('apportment');

    return (
      <div className="report-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="report-form"
        >
          <FormItem
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please insert a Name!' }],
            })(<Input placeholder="Name" />)}
          </FormItem>
          <FormItem
            validateStatus={apportmentError ? 'error' : ''}
            help={apportmentError || ''}
          >
            {getFieldDecorator('apportment', {
              rules: [
                { required: true, message: 'Please insert a Apportment!' },
              ],
            })(<Input placeholder="Apportment" />)}
          </FormItem>
          <Row type="flex" justify="end">
            <Button onClick={() => this.handleCancel()}>Cancel</Button>
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {this.props.report ? 'Edit' : 'Create'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

ReportForm.propTypes = {
  form: PropTypes.object.isRequired,
  report: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create({
  mapPropsToFields({ report }) {
    return report
      ? {
        name: Form.createFormField({ value: report.name }),
        apportment: Form.createFormField({ value: report.apportment }),
      }
      : {};
  },
});
export default compose(withFormCreate)(ReportForm);
