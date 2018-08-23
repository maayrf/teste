/**
 *
 * MachineForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row } from 'antd';
import { compose } from 'redux';

const FormItem = Form.Item;
const { TextArea } = Input;

class MachineForm extends Component {
  componentDidMount() {
    const { form, machine } = this.props;
    if (machine) {
      form.setFieldsValue(machine);
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
    const machineData = this.props.machine
      ? { ...this.props.form.getFieldsValue(), id: this.props.machine.id }
      : { ...this.props.form.getFieldsValue(), eggId: this.props.eggId };
    this.props.onSubmit(machineData);
    return false;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading, onCancel } = this.props;
    const nameError = this.getError('name');
    const modelError = this.getError('model');
    const makerError = this.getError('maker');
    const nominalVoltageError = this.getError('nominalVoltage');
    const ratedCurrentError = this.getError('ratedCurrent');
    const commentsError = this.getError('comments');

    return (
      <div className="machine-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="machine-form"
        >
          <FormItem
            label="Nome"
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Por favor preencha o campo Name!' },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Modelo"
            validateStatus={modelError ? 'error' : ''}
            help={modelError || ''}
          >
            {getFieldDecorator('model', {
              rules: [
                {
                  required: true,
                  message: 'Por favor preencha o campo Modelo!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Marca"
            validateStatus={makerError ? 'error' : ''}
            help={makerError || ''}
          >
            {getFieldDecorator('maker', {
              rules: [
                {
                  required: true,
                  message: 'Por favor preencha o campo Marca!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Corrente Nominal"
            validateStatus={nominalVoltageError ? 'error' : ''}
            help={nominalVoltageError || ''}
          >
            {getFieldDecorator('nominalVoltage', {
              rules: [
                {
                  required: true,
                  message: 'Por favor preencha o campo Corrente Nominal!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Tensão Nominal"
            validateStatus={ratedCurrentError ? 'error' : ''}
            help={ratedCurrentError || ''}
          >
            {getFieldDecorator('ratedCurrent', {
              rules: [
                {
                  required: true,
                  message: 'Por favor preencha o campo Tensão Nominal!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Observações"
            validateStatus={commentsError ? 'error' : ''}
            help={commentsError || ''}
          >
            {getFieldDecorator('comments', {
              rules: [{ message: 'Por favor preencha o campo Observações!' }],
            })(<TextArea />)}
          </FormItem>
          <Row type="flex" justify="end">
            {onCancel ? (
              <Button onClick={() => this.handleCancel()}>Cancelar</Button>
            ) : (
              ''
            )}
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {this.props.machine ? 'Editar' : 'Cadastrar'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

MachineForm.propTypes = {
  form: PropTypes.object.isRequired,
  eggId: PropTypes.number,
  machine: PropTypes.shape({
    name: PropTypes.string,
    model: PropTypes.string,
    maker: PropTypes.string,
    nominalVoltage: PropTypes.number,
    ratedCurrent: PropTypes.number,
    comments: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(MachineForm);
