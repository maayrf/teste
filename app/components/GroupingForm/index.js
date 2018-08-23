/**
 *
 * GroupingForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row } from 'antd';
import { compose } from 'redux';

const FormItem = Form.Item;

class GroupingForm extends Component {
  componentDidMount() {
    const { form, grouping } = this.props;
    if (grouping) {
      const { name } = grouping;
      form.setFieldsValue({
        name,
      });
    }
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
    const groupingData = this.props.grouping.id
      ? {
        ...this.props.form.getFieldsValue(),
        parentMeter: this.props.grouping.parentMeter,
        id: this.props.grouping.id,
      }
      : {
        ...this.props.form.getFieldsValue(),
        parentMeter: this.props.grouping.parentMeter,
      };
    this.props.onSubmit(groupingData);
    return false;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading } = this.props;
    const nameError = this.getError('name');

    return (
      <div className="grouping-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="grouping-form"
        >
          <FormItem
            label="Nome"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Por favor preencher o campo Nome!',
                },
              ],
            })(<Input placeholder="Name" />)}
          </FormItem>
          <Row type="flex" justify="end">
            <Button onClick={() => this.handleCancel()}>Cancel</Button>
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {this.props.grouping.id ? 'Editar' : 'Cadastrar'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

GroupingForm.propTypes = {
  form: PropTypes.object.isRequired,
  grouping: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    parentMeter: PropTypes.shape({
      id: PropTypes.number,
      className: PropTypes.string,
    }),
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(GroupingForm);
