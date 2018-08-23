/**
 *
 * MyPerformanceIndexForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Select, Row } from 'antd';
import { compose } from 'redux';
import {
  CONSUMPTION_NOT_PRODUCTIVE_HOURS,
  CONSUMPTION_OFF_PEAK,
  CONSUMPTION_PEAK,
  CONSUMPTION_PRODUCTIVE_HOURS,
  CONSUMPTION_TOTAL,
  MONTHLY,
  ONE_MONTH,
  ONE_WEEK,
  WEEKLY,
} from '../../../PerformanceConfigurationListContainer/constants';
import ButtonMeterTreePopover from '../../../../components/ButtonMeterTreePopover';

const FormItem = Form.Item;
const SelectOption = Select.Option;

const REFERENCE_PARAMS = [
  {
    key: CONSUMPTION_TOTAL,
    value: 'Consumo Total',
  },
  {
    key: CONSUMPTION_PRODUCTIVE_HOURS,
    value: 'Consumo em horário produtivo',
  },
  {
    key: CONSUMPTION_NOT_PRODUCTIVE_HOURS,
    value: 'Consumo em horário não produtivo',
  },
  {
    key: CONSUMPTION_OFF_PEAK,
    value: 'Consumo fora de ponta',
  },
  {
    key: CONSUMPTION_PEAK,
    value: 'Consumo de ponta',
  },
];

const UNITS = [
  'kg',
  'ton',
  'litros',
  'm3',
  'unidade',
  'ocupação',
  'm2',
  'outro',
];

const REPORT_INTERVALS = [
  {
    key: ONE_WEEK,
    value: WEEKLY,
  },
  {
    key: ONE_MONTH,
    value: MONTHLY,
  },
];

class MyPerformanceIndexForm extends Component {
  state = {
    showAnotherUnit: false,
    meter: null,
    checkedMeters: [],
    checkedMeter: {},
    isMarked: false,
  };
  componentDidMount() {
    const { form } = this.props;
    this.prevFormValues = form.getFieldsValue();
    form.validateFields();
  }
  componentDidUpdate() {
    const { getFieldsValue, validateFields } = this.props.form;
    const { unit } = getFieldsValue();
    const { unit: prevUnit } = this.prevFormValues;
    if (unit !== prevUnit) {
      this.prevFormValues = getFieldsValue();
      validateFields();
    }
  }
  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  }
  cleanState() {
    this.setState({
      meter: null,
      checkedMeters: [],
      checkedMeter: {},
      isMarked: false,
    });
  }
  hasErrors() {
    const errors = this.props.form.getFieldsError();
    return Object.keys(errors).some((key) => errors[key]);
  }

  handleCancel = () => {
    this.cleanState();
    this.props.onCancel();
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }
    const myPerformanceIndexData = this.props.myPerformanceIndex
      ? {
        ...this.props.form.getFieldsValue(),
        id: this.props.myPerformanceIndex.id,
      }
      : this.props.form.getFieldsValue();

    const { unit, anotherUnit, ...restProps } = myPerformanceIndexData;
    const newUnit = unit === 'outro' && anotherUnit ? anotherUnit : unit;
    this.props.onSubmit({
      ...restProps,
      unit: newUnit,
      meter: this.state.meter,
    });
    this.cleanState();
    return false;
  };
  handleChangeUnit = (unit) => {
    if (unit === 'outro') {
      this.setState({ showAnotherUnit: true });
    } else {
      this.setState({ showAnotherUnit: false });
    }
  };
  showFormItemAnotherUnit = () => {
    if (this.state.showAnotherUnit) {
      const { getFieldDecorator } = this.props.form;
      const anotherUnitError = this.getError('anotherUnit');
      return (
        <FormItem
          validateStatus={anotherUnitError ? 'error' : ''}
          help={anotherUnitError || ''}
          label="Informe a unidade desejada"
        >
          {getFieldDecorator('anotherUnit', {
            rules: [{ required: true, message: 'Informe uma outra unidade!' }],
          })(<Input placeholder="Outra unidade" />)}
        </FormItem>
      );
    }
  };
  handleMeters = (meters, checkedMeter, isMarked) => {
    if (Object.keys(checkedMeter).length && isMarked) {
      const meter = {
        className: checkedMeter.className,
        id: checkedMeter.id,
      };
      this.setState({
        meter,
        checkedMeters: meters,
        checkedMeter,
        isMarked,
      });
    } else {
      this.cleanState();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const valid = !this.hasErrors();
    const { loading, myPerformanceIndex } = this.props;
    const { checkedMeter, checkedMeters, isMarked } = this.state;
    const referenceParamError = this.getError('referenceParam');
    const unitError = this.getError('unit');
    const nameError = this.getError('name');
    const reportIntervalError = this.getError('reportInterval');

    return (
      <div className="myPerformanceIndex-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="myPerformanceIndex-form"
        >
          <ButtonMeterTreePopover
            onMetersUpdate={this.handleMeters}
            checkedMeters={checkedMeters}
            checkedMeter={checkedMeter}
            isMarked={isMarked}
          />
          <FormItem
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
            label="Nome da configuração de performance"
          >
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Dê um nome a configuração!' },
              ],
            })(<Input placeholder="Digite um nome" />)}
          </FormItem>
          <FormItem
            validateStatus={referenceParamError ? 'error' : ''}
            help={referenceParamError || ''}
            label="Qual o Parâmetro de Referência?"
          >
            {getFieldDecorator('referenceParam', {
              rules: [
                {
                  required: true,
                  message: 'Selecione um parâmetro de referência!',
                },
              ],
            })(<Select placeholder="Selecione um parâmente de referência">
              {REFERENCE_PARAMS.map((item) => (
                <SelectOption key={item.key} value={item.key}>
                  {item.value}
                </SelectOption>
              ))}
               </Select>)}
          </FormItem>
          <FormItem
            validateStatus={unitError ? 'error' : ''}
            help={unitError || ''}
            label="Qual a unidade utilizada para essa métrica?"
          >
            {getFieldDecorator('unit', {
              rules: [
                { required: true, message: 'Selecione uma unidade de medida!' },
              ],
            })(<Select
              placeholder="Selecione uma unidade de medida"
              onChange={this.handleChangeUnit}
            >
              {UNITS.map((item) => (
                <SelectOption key={item} value={item}>
                  {item}
                </SelectOption>
              ))}
            </Select>)}
          </FormItem>
          {this.showFormItemAnotherUnit()}
          <FormItem
            validateStatus={reportIntervalError ? 'error' : ''}
            help={reportIntervalError || ''}
            label="Qual o intervalo de verificação que deve ser feito?"
          >
            {getFieldDecorator('reportInterval', {
              rules: [
                {
                  required: true,
                  message: 'Selecione um intervalo de verificação!',
                },
              ],
            })(<Select placeholder="Selecione um intervalo">
              {REPORT_INTERVALS.map((item) => (
                <SelectOption key={item.key} value={item.key}>
                  {item.value}
                </SelectOption>
              ))}
            </Select>)}
          </FormItem>
          <Row type="flex" justify="end" gutter={15}>
            <Col>
              <Button onClick={() => this.handleCancel()}>Cancelar</Button>
            </Col>
            <Col>
              <Button
                loading={loading}
                disabled={!valid || !this.state.meter}
                onClick={() => this.handleSubmit()}
                type="primary"
                icon={myPerformanceIndex ? 'edit' : 'plus'}
              >
                {myPerformanceIndex ? 'Editar' : 'Criar'}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

MyPerformanceIndexForm.propTypes = {
  form: PropTypes.object.isRequired,
  myPerformanceIndex: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create({
  mapPropsToFields({ myPerformanceIndex }) {
    return myPerformanceIndex
      ? {
        referenceParam: Form.createFormField({
          value: myPerformanceIndex.referenceParam,
        }),
        unit: Form.createFormField({ value: myPerformanceIndex.unit }),
        anotherUnit: Form.createFormField({
          value: myPerformanceIndex.anotherUnit,
        }),
        name: Form.createFormField({ value: myPerformanceIndex.name }),
        reportInterval: Form.createFormField({
          value: myPerformanceIndex.reportInterval,
        }),
      }
      : {};
  },
});
export default compose(withFormCreate)(MyPerformanceIndexForm);
