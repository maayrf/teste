/**
 *
 * DisableFareForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, DatePicker, Form, Row } from 'antd';
import { compose } from 'redux';
import moment from 'moment';

const FormItem = Form.Item;
const DATE_FORMAT = 'DD/MM/YYYY';

class DisableFareForm extends Component {
  componentDidMount() {
    const { form } = this.props;
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
    const disableDemandExceedFareData = this.props.fareData
      ? {
        ...this.props.form.getFieldsValue(),
        id: this.props.fareData.id,
      }
      : this.props.form.getFieldsValue();
    this.props.onSubmit(disableDemandExceedFareData);
    return false;
  };

  validateDate = (rule, value, callback) => {
    if (!value) {
      callback('Preencha a data para desabilitar a tarifa!');
    }
    callback();
  };

  disabledDate = (current) => {
    const daysAfterOrSameOfToday =
      current &&
      current >
        moment()
          .endOf('day')
          .subtract(1, 'days');
    const daysBeforeStartDate =
      current && current < this.props.fareData.startDate;
    return daysAfterOrSameOfToday || daysBeforeStartDate;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading } = this.props;
    const endDateError = this.getError('endDate');

    return (
      <div className="disableDemandExceedFare-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="disableDemandExceedFare-form"
        >
          <FormItem
            label="Data de encerramento"
            validateStatus={endDateError ? 'error' : ''}
            help={endDateError || ''}
          >
            {getFieldDecorator('endDate', {
              rules: [
                {
                  validator: this.validateDate,
                },
              ],
            })(<DatePicker
              disabledDate={this.disabledDate}
              format={DATE_FORMAT}
            />)}
          </FormItem>
          <Row type="flex" justify="end" gutter={15}>
            <Col>
              <Button onClick={() => this.handleCancel()}>Cancelar</Button>
            </Col>
            <Col>
              <Button
                loading={loading}
                disabled={!valid}
                onClick={() => this.handleSubmit()}
                type="primary"
              >
                {this.props.fareData ? 'Encerrar Tarifa' : 'Adicionar'}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

DisableFareForm.propTypes = {
  form: PropTypes.object.isRequired,
  fareData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startDate: PropTypes.object.isRequired,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(DisableFareForm);
