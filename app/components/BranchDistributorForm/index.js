/**
 *
 * BranchDistributorForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Row } from 'antd';
import { compose } from 'redux';
import SelectFareType from '../SelectFareType';
import SelectFareModel from '../SelectFareModel';
import SelectDealershipContainer from '../../containers/SelectDealershipContainer';
import SelectTypesSupply from '../SelectTypesSupply/index';
import InputDecimalNumberGroupWithPrefix from '../InputDecimalNumberGroupWithPrefix';
import InputNumberGroupWithPrefix from '../InputNumberGroupWithPrefix';
import './style.less';

const FormItem = Form.Item;
const minValueDecimal = 0.01;
const minValueInteger = 1;

class BranchDistributorForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }
  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  }
  getInitialValue = (value) => this.props.branchDistributor[value];
  hasErrors() {
    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some((key) => errors[key]);
  }
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    const branchDistributorData = this.props.form.getFieldsValue();
    this.props.onSubmit(branchDistributorData);
    return false;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading } = this.props;
    const nameError = this.getError('name');
    const typeSupplyError = this.getError('typeSupply');
    const installationNumberError = this.getError('installationNumber');
    const classSubClassError = this.getError('classSubClass');
    const clientNumberError = this.getError('clientNumber');
    const fareTypeError = this.getError('fareType');
    const fareModelError = this.getError('fareModel');
    const contractedDemandError = this.getError('contractedDemand');
    const contractedVoltageError = this.getError('contractedVoltage');
    const monthlyAverageConsumptionError = this.getError('monthlyAverageConsumption');
    const monthlyAverageCostError = this.getError('monthlyAverageCost');
    const nominalVoltageError = this.getError('nominalVoltage');
    const installedPowerError = this.getError('installedPower');

    return (
      <div className="branchDistributor-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="branchDistributor-form"
        >
          <Row type="flex" gutter={20}>
            <Col span={24} lg={10}>
              <FormItem
                validateStatus={nameError ? 'error' : ''}
                help={nameError || ''}
                label="Concessionária"
              >
                {getFieldDecorator('name', {
                  initialValue: this.getInitialValue('name'),
                  rules: [{ required: true, message: 'Insira a !' }],
                })(<SelectDealershipContainer />)}
              </FormItem>
            </Col>
            <Col span={12} lg={8}>
              <FormItem
                validateStatus={typeSupplyError ? 'error' : ''}
                help={typeSupplyError || ''}
                label="Tipo fornecimento"
              >
                {getFieldDecorator('typeSupply', {
                  initialValue: this.getInitialValue('typeSupply'),
                  rules: [
                    {
                      required: true,
                      message: 'Insira o tipo do fornecimento!',
                    },
                  ],
                })(<SelectTypesSupply placeholder="Selecione um tipo de fornecimento" />)}
              </FormItem>
            </Col>
            <Col span={12} lg={6}>
              <FormItem
                validateStatus={installationNumberError ? 'error' : ''}
                help={installationNumberError || ''}
                label="Número de instalação"
              >
                {getFieldDecorator('installationNumber', {
                  initialValue: this.getInitialValue('installationNumber'),
                  rules: [
                    {
                      message: 'Insira o número de instalação!',
                    },
                  ],
                })(<Input placeholder="123456" />)}
              </FormItem>
            </Col>
            <Col span={12} lg={8}>
              <FormItem
                validateStatus={classSubClassError ? 'error' : ''}
                help={classSubClassError || ''}
                label="Classe/Subclasse"
              >
                {getFieldDecorator('classSubClass', {
                  initialValue: this.getInitialValue('classSubClass'),
                  rules: [
                    {
                      message: 'Insira a Class/SubClass!',
                    },
                  ],
                })(<Input placeholder="Class/SubClass" />)}
              </FormItem>
            </Col>
            <Col span={12} lg={8}>
              <FormItem
                validateStatus={clientNumberError ? 'error' : ''}
                help={clientNumberError || ''}
                label="Número do cliente"
              >
                {getFieldDecorator('clientNumber', {
                  initialValue: this.getInitialValue('clientNumber'),
                  rules: [
                    {
                      message: 'Insira o número do cliente!',
                    },
                  ],
                })(<Input placeholder="123.123/12" />)}
              </FormItem>
            </Col>
            <Col span={12} lg={8}>
              <FormItem
                validateStatus={fareTypeError ? 'error' : ''}
                help={fareTypeError || ''}
                label="Tipo de tarifa"
              >
                {getFieldDecorator('fareType', {
                  initialValue: this.getInitialValue('fareType'),
                  rules: [
                    { required: true, message: 'Insira o tipo da tarifa!' },
                  ],
                })(<SelectFareType placeholder="Selecione um tipo de tarifa" />)}
              </FormItem>
            </Col>
            <Col span={12} lg={10}>
              <FormItem
                validateStatus={fareModelError ? 'error' : ''}
                help={fareModelError || ''}
                label="Modelo de tarifação"
              >
                {getFieldDecorator('fareModel', {
                  initialValue: this.getInitialValue('fareModel'),
                  rules: [
                    {
                      required: true,
                      message: 'Insira o modelo de tarifação!',
                    },
                  ],
                })(<SelectFareModel placeholder="Selecione um modelo de tarifação" />)}
              </FormItem>
            </Col>
            <Col span={12} lg={8}>
              <FormItem
                validateStatus={contractedDemandError ? 'error' : ''}
                help={contractedDemandError || ''}
                label="Demanda contratada"
              >
                {getFieldDecorator('contractedDemand', {
                  initialValue: this.getInitialValue('contractedDemand'),
                  rules: [
                    {
                      required: true,
                      message: 'Insira demanda contratada!',
                    },
                  ],
                })(<InputDecimalNumberGroupWithPrefix
                  prefix="kW"
                  min={minValueDecimal}
                />)}
              </FormItem>
            </Col>
            <Col span={12} lg={6}>
              <FormItem
                validateStatus={contractedVoltageError ? 'error' : ''}
                help={contractedVoltageError || ''}
                label="Tensão contratada"
              >
                {getFieldDecorator('contractedVoltage', {
                  initialValue: this.getInitialValue('contractedVoltage'),
                  rules: [
                    {
                      required: true,
                      message: 'Insira a tensão contratada!',
                    },
                  ],
                })(<InputNumberGroupWithPrefix
                  prefix="V"
                  min={minValueInteger}
                />)}
              </FormItem>
            </Col>
            <Col span={12} lg={6}>
              <FormItem
                validateStatus={monthlyAverageConsumptionError ? 'error' : ''}
                help={monthlyAverageConsumptionError || ''}
                label="Consumo médio mensal"
              >
                {getFieldDecorator('monthlyAverageConsumption', {
                  initialValue: this.getInitialValue('monthlyAverageConsumption'),
                  rules: [
                    {
                      required: true,
                      message: 'Insira o consumo médio mensal!',
                    },
                  ],
                })(<InputDecimalNumberGroupWithPrefix
                  prefix="kWh"
                  min={minValueDecimal}
                />)}
              </FormItem>
            </Col>
            <Col span={12} lg={6}>
              <FormItem
                validateStatus={monthlyAverageCostError ? 'error' : ''}
                help={monthlyAverageCostError || ''}
                label="Custo médio mensal"
              >
                {getFieldDecorator('monthlyAverageCost', {
                  initialValue: this.getInitialValue('monthlyAverageCost'),
                  rules: [
                    {
                      required: true,
                      message: 'Insira o custo médio mensal!',
                    },
                  ],
                })(<InputDecimalNumberGroupWithPrefix
                  prefix="R$"
                  min={minValueDecimal}
                />)}
              </FormItem>
            </Col>
            <Col span={12} lg={6}>
              <FormItem
                validateStatus={nominalVoltageError ? 'error' : ''}
                help={nominalVoltageError || ''}
                label="Tensão nominal"
              >
                {getFieldDecorator('nominalVoltage', {
                  initialValue: this.getInitialValue('nominalVoltage'),
                  rules: [
                    {
                      required: true,
                      message: 'Insira a tensão nominal!',
                    },
                  ],
                })(<InputNumberGroupWithPrefix
                  prefix="V"
                  min={minValueInteger}
                />)}
              </FormItem>
            </Col>
            <Col span={12} lg={6}>
              <FormItem
                validateStatus={installedPowerError ? 'error' : ''}
                help={installedPowerError || ''}
                label="Potência Instalada"
              >
                {getFieldDecorator('installedPower', {
                  initialValue: this.getInitialValue('installedPower'),
                  rules: [
                    {
                      required: true,
                      message: 'Insira a potencia instalada!',
                    },
                  ],
                })(<InputDecimalNumberGroupWithPrefix
                  prefix="kW"
                  min={minValueDecimal}
                />)}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="end">
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {this.props.branchDistributor ? 'Editar' : 'Salvar'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

BranchDistributorForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  branchDistributor: PropTypes.object.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(BranchDistributorForm);
