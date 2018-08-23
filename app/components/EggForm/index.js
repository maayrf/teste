/* eslint-disable consistent-return */
/* eslint-disable react/jsx-closing-tag-location */

/**
 *
 * EggForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { compose } from 'redux';
import InputDecimalNumber from '../InputDecimalNumber/index';
import injectReducer from '../../utils/injectReducer';
import meterNetworkFormReducer from '../../containers/MeterNetworkFormContainer/reducer';
import injectSaga from '../../utils/injectSaga';
import meterNetworkFormSaga from '../../containers/MeterNetworkFormContainer/saga';

const FORM_OPTIONS = {
  loads: [
    { id: '0', name: 'Não Preenchida' },
    { id: '1', name: 'Monofásico' },
    { id: '2', name: 'Bifásico' },
    { id: '3', name: 'Trifásico' },
  ],
  numberOfSensors: [
    { id: '0', name: 'Não Preenchida' },
    { id: '1', name: '2 Wattimetros' },
    { id: '2', name: '3 Wattimetros' },
  ],
  types: [
    { id: '0', name: 'Não Preenchida' },
    { id: '1', name: 'Carga especifica' },
    { id: '2', name: 'Conjunto de cargas similares' },
    { id: '3', name: 'Conjunto de cargas diferentes' },
    { id: '4', name: 'Setor definido' },
    { id: '5', name: 'Entrada em linha com distribuidora' },
  ],
};

class EggForm extends Component {
  componentDidMount() {
    const { form, egg } = this.props;
    if (egg) {
      const {
        name,
        wifi,
        load,
        numberOfSensors,
        type,
        factor,
        currentTransformer,
      } = egg;
      form.setFieldsValue({
        name,
        wifi: {
          ssid: wifi.ssid,
          password: wifi.password,
          protocol: wifi.protocol,
        },
        load: load.toString(),
        numberOfSensors: numberOfSensors.toString(),
        type: type.toString(),
        factor: factor.toString(),
        currentTransformer,
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
    return Object.keys(errors).some((key) => {
      const error = errors[key];
      if (typeof error !== 'object') {
        return error;
      }
      return Object.keys(error).some((key2) => error[key2]);
    });
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    const egg = this.props.egg
      ? { ...this.props.form.getFieldsValue(), id: this.props.egg.id }
      : this.props.form.getFieldsValue();
    this.props.onSubmit(egg);
    return false;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading, onCancel, egg } = this.props;
    const { loads, numberOfSensors, types } = FORM_OPTIONS;
    const nameError = this.getError('name');
    const loadError = this.getError('load');
    const numberOfSensorsError = this.getError('numberOfSensors');
    const typeError = this.getError('type');
    const factorError = this.getError('factor');
    const currentTransformerError = this.getError('currentTransformer');

    const FormItem = Form.Item;
    const { Option } = Select;

    return (
      <div className="meterForm-form _margin-bottom _padding-bottom _border-bottom">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="meterForm-form"
        >
          <Row type="flex" gutter={20}>
            <Col span={24} className="_margin-bottom">
              <h2 className="_page-title">Medição</h2>
            </Col>
            <Col sm={24} lg={24}>
              <FormItem
                label="NOME DO MÓDULO"
                validateStatus={nameError ? 'error' : ''}
                help={nameError || ''}
              >
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor preencha o campo: Nome do Modulo!',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="CARGA"
                validateStatus={loadError ? 'error' : ''}
                help={loadError || ''}
              >
                {getFieldDecorator('load', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor preencha o campo: Carga!',
                    },
                  ],
                })(<Select>
                  {loads.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="MÉTODO DE MEDIÇÃO"
                validateStatus={numberOfSensorsError ? 'error' : ''}
                help={numberOfSensorsError || ''}
              >
                {getFieldDecorator('numberOfSensors', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor preencha o campo: Método de Medição!',
                    },
                  ],
                })(<Select>
                  {numberOfSensors.map(({ id, name }) => (
                    <Option key={id} value={id}>
                      {name}
                    </Option>
                  ))}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="TIPO DE MEDIÇÃO"
                validateStatus={typeError ? 'error' : ''}
                help={typeError || ''}
              >
                {getFieldDecorator('type', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor preencha o campo: Tipo de Medição!',
                    },
                  ],
                })(<Select>
                  {types.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="FATOR DE CALIBRAÇÃO"
                validateStatus={factorError ? 'error' : ''}
                help={factorError || ''}
              >
                {getFieldDecorator('factor', {
                  rules: [
                    {
                      required: true,
                      message:
                        'Por favor preencha o campo: Fator de Calibração!',
                    },
                  ],
                })(<InputDecimalNumber min={0.01} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="TIPO DE TC"
                validateStatus={currentTransformerError ? 'error' : ''}
                help={currentTransformerError || ''}
              >
                {getFieldDecorator('currentTransformer', {
                  rules: [
                    {
                      required: true,
                      message:
                        'Por favor preencha o campo: Configuração de TC!',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="end">
            {onCancel ? (
              <Button onClick={() => this.handleCancel()}>Cancelar</Button>
            ) : (
              ''
            )}
            <Button
              loading={!!loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {egg ? 'Salvar' : 'Cadastrar'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

EggForm.propTypes = {
  form: PropTypes.object.isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  egg: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    wifi: PropTypes.shape({
      ssid: PropTypes.string,
      password: PropTypes.string,
      protocol: PropTypes.string,
    }),
    load: PropTypes.number,
    numberOfSensors: PropTypes.number,
    type: PropTypes.string,
    factor: PropTypes.number,
    currentTransformer: PropTypes.string,
  }),
};

const withMeterNetworkFormReducer = injectReducer({
  key: 'meterNetworkForm',
  reducer: meterNetworkFormReducer,
});
const withMeterNetworkFormSaga = injectSaga({
  key: 'meterNetworkForm',
  saga: meterNetworkFormSaga,
});

const withFormCreate = Form.create();
export default compose(
  withFormCreate,
  withMeterNetworkFormReducer,
  withMeterNetworkFormSaga
)(EggForm);
