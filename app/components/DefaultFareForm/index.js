/**
 *
 * DefaultFareForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Row,
  DatePicker,
  TimePicker,
  Select,
  Input,
  Checkbox,
} from 'antd';
import { compose } from 'redux';
import InputDecimalNumber from '../InputDecimalNumber/index';
import { DATE_FORMAT_PTBR } from '../DateRangePicker/constants';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const { Option } = Select;

class DefaultFareForm extends Component {
  static getDerivedStateFromProps = (nextProps, nextState) => {
    const { fare, registerOnlyPreviousRates } = nextProps;
    if (registerOnlyPreviousRates) {
      return { thereIsEndDate: true };
    }
    if (!nextState.checkBoxDirty && fare) {
      if (fare.startDate && fare.endDate) {
        return { thereIsEndDate: true };
      }
    }
    return {};
  };
  state = {
    thereIsEndDate: false,
    checkBoxDirty: false,
  };

  componentDidMount() {
    const { form, fare } = this.props;
    if (fare) {
      const {
        startDate,
        endDate,
        rushStartTime,
        rushEndTime,
        rushValue,
        outRushValue,
        consumptionUnit,
      } = fare;

      let fieldsToSet = {
        rushValue,
        outRushValue,
        consumptionUnit,
      };
      if (
        rushStartTime &&
        rushStartTime.isValid() &&
        rushEndTime &&
        rushEndTime.isValid()
      ) {
        fieldsToSet = {
          ...fieldsToSet,
          rushStartTime,
          rushEndTime,
        };
      }
      if (this.state.thereIsEndDate) {
        fieldsToSet = {
          ...fieldsToSet,
          initEndRangeDates: [startDate, endDate],
        };
      } else {
        fieldsToSet = {
          ...fieldsToSet,
          startDate,
        };
      }
      form.setFieldsValue(fieldsToSet);
    }
    form.validateFields();
  }
  componentDidUpdate(prevProps, prevState) {
    const { validateFields } = this.props.form;
    if (prevState.thereIsEndDate !== this.state.thereIsEndDate) {
      const fieldToBeValidated = this.state.thereIsEndDate
        ? 'initEndRangeDates'
        : 'startDate';
      validateFields([fieldToBeValidated]);
    }
  }
  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    const { fare } = this.props;
    if (fare.id) {
      return getFieldError(prop);
    }
    return isFieldTouched(prop) && getFieldError(prop);
  }
  handleChangeThereIsEndDate = (event) => {
    this.setState({
      thereIsEndDate: event.target.checked,
      checkBoxDirty: true,
    });
  };
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
    const {
      fare: {
        branch: { id: branchId },
      },
    } = this.props;
    const { thereIsEndDate } = this.state;
    const {
      initEndRangeDates,
      startDate,
      ...restFields
    } = this.props.form.getFieldsValue();
    let fareData = {
      ...restFields,
      branchId,
    };
    if (thereIsEndDate) {
      fareData = {
        ...fareData,
        startDate: initEndRangeDates[0],
        endDate: initEndRangeDates[1],
      };
    } else {
      fareData = {
        ...fareData,
        startDate,
      };
    }
    if (this.props.fare.id) {
      fareData = {
        ...fareData,
        id: this.props.fare.id,
      };
    }
    this.props.onSubmit(fareData);
    return false;
  };
  validateInitDate = (rule, value, callback) => {
    const { thereIsEndDate } = this.state;
    if (thereIsEndDate) {
      callback();
      return;
    }
    if (!value) {
      callback('Preencha a Data Inicial!');
    }
    callback();
  };
  validateInitEndRangeDate = (rule, value, callback) => {
    const { thereIsEndDate } = this.state;
    if (!thereIsEndDate) {
      callback();
      return;
    }
    if (!value || !value.length) {
      callback('Preencha o período da tarifa!');
    }
    callback();
  };
  rushStartTimeValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return;
    }
    const { getFieldValue, validateFields } = this.props.form;
    const rushEndTime = getFieldValue('rushEndTime');
    if (rushEndTime) {
      validateFields(['rushEndTime'], { force: true });
    }
    callback();
  };
  rushEndTimeValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return;
    }
    const { getFieldValue } = this.props.form;
    const rushStartTime = getFieldValue('rushStartTime');
    const isSameOrBeforeThanEndTime = value.isSameOrBefore(rushStartTime);
    if (isSameOrBeforeThanEndTime) {
      callback('Hora de Fim deve ser maior que o Horário de início!');
    }
    callback();
  };

  renderToggleToRangeOrDatePicker = () => {
    const { registerOnlyPreviousRates } = this.props;
    if (registerOnlyPreviousRates) {
      return;
    }
    const inlineFormItemOptions = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const { thereIsEndDate } = this.state;
    return (
      <FormItem
        {...inlineFormItemOptions}
        label="Esta tarifa já possui uma data de término?"
      >
        <Checkbox
          onChange={this.handleChangeThereIsEndDate}
          checked={thereIsEndDate}
        >
          Já possui
        </Checkbox>
      </FormItem>
    );
  };

  renderInitEndDateFormItem = () => {
    const initEndRangeDatesError = this.getError('initEndRangeDates');
    const { getFieldDecorator } = this.props.form;
    const { thereIsEndDate } = this.state;

    return thereIsEndDate ? (
      <FormItem
        validateStatus={initEndRangeDatesError ? 'error' : ''}
        help={initEndRangeDatesError || ''}
      >
        <Row type="flex" justify="start" align="middle" gutter={80}>
          <h4>Data Inicial</h4>
          <h4>Data Final</h4>
        </Row>
        {getFieldDecorator('initEndRangeDates', {
          rules: [
            {
              validator: this.validateInitEndRangeDate,
            },
          ],
        })(<RangePicker format={DATE_FORMAT_PTBR} />)}
      </FormItem>
    ) : (
      <FormItem
        label="A partir de"
        validateStatus={initEndRangeDatesError ? 'error' : ''}
        help={initEndRangeDatesError || ''}
      >
        {getFieldDecorator('startDate', {
          rules: [
            {
              validator: this.validateInitDate,
            },
          ],
        })(<DatePicker format={DATE_FORMAT_PTBR} />)}
      </FormItem>
    );
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const valid = !this.hasErrors();
    const { loading, units } = this.props;
    const rushStartTimeError = this.getError('rushStartTime');
    const rushEndTimeError = this.getError('rushEndTime');
    const rushValueError = this.getError('rushValue');
    const outRushValueError = this.getError('outRushValue');
    const consumptionUnitError = this.getError('consumptionUnit');

    const timeFormat = 'HH:mm';
    const consumptionUnit = getFieldValue('consumptionUnit') || '';

    return (
      <div className="fare-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="fare-form"
        >
          {this.renderToggleToRangeOrDatePicker()}
          {this.renderInitEndDateFormItem()}
          <FormItem
            label="Unidade de Consumo"
            validateStatus={consumptionUnitError ? 'error' : ''}
            help={consumptionUnitError || ''}
          >
            {getFieldDecorator('consumptionUnit', {
              rules: [
                {
                  required: true,
                  message: 'Por favor preencha o campo: Unidade de Consumo!',
                },
              ],
            })(<Select style={{ width: '100px', maxWidth: '100%' }}>
              {units.map((unit) => (
                <Option key={unit} value={unit}>
                    R$/{unit}
                </Option>
              ))}
            </Select>)}
          </FormItem>
          <h3>Horário de Ponta</h3>
          <Row type="flex" className="_flex-nowrap" gutter={30}>
            <FormItem
              label="Horário de Início"
              validateStatus={rushStartTimeError ? 'error' : ''}
              help={rushStartTimeError || ''}
            >
              {getFieldDecorator('rushStartTime', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor preencha o campo: Init Time!',
                  },
                  {
                    validator: this.rushStartTimeValidator,
                  },
                ],
              })(<TimePicker format={timeFormat} />)}
            </FormItem>
            <FormItem
              label="Horário de Término"
              validateStatus={rushEndTimeError ? 'error' : ''}
              help={rushEndTimeError || ''}
            >
              {getFieldDecorator('rushEndTime', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor preencha o campo: End Time!',
                  },
                  {
                    validator: this.rushEndTimeValidator,
                  },
                ],
              })(<TimePicker format={timeFormat} />)}
            </FormItem>
          </Row>
          <FormItem
            label="Valor Horário de Ponta"
            validateStatus={rushValueError ? 'error' : ''}
            help={rushValueError || ''}
          >
            <InputGroup compact>
              <Input
                style={{ width: '20%' }}
                disabled
                value={`R$/${consumptionUnit}`}
              />
              {getFieldDecorator('rushValue', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor preencha o campo: Rush!',
                  },
                ],
              })(<InputDecimalNumber
                style={{ width: '300px', maxWidth: '80%' }}
                numberDecimals={5}
                min={0.00001}
              />)}
            </InputGroup>
          </FormItem>
          <h3>Horário Fora de Ponta</h3>
          <FormItem
            label="Valor Horário Fora de Ponta"
            validateStatus={outRushValueError ? 'error' : ''}
            help={outRushValueError || ''}
          >
            <InputGroup compact>
              <Input
                style={{ width: '20%' }}
                disabled
                value={`R$/${consumptionUnit}`}
              />
              {getFieldDecorator('outRushValue', {
                rules: [
                  {
                    required: true,
                    message:
                      'Por favor preencha o campo: Valor Horário Fora de Ponta!',
                  },
                ],
              })(<InputDecimalNumber
                style={{ width: '300px', maxWidth: '100%' }}
                numberDecimals={5}
                min={0.00001}
              />)}
            </InputGroup>
          </FormItem>
          <Row type="flex" justify="end">
            <Button onClick={() => this.handleCancel()}>Cancelar</Button>
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {this.props.fare && this.props.fare.id ? 'Editar' : 'Cadastrar'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

DefaultFareForm.propTypes = {
  registerOnlyPreviousRates: PropTypes.bool,
  form: PropTypes.object.isRequired,
  fare: PropTypes.shape({
    id: PropTypes.number,
    branch: PropTypes.shape({
      id: PropTypes.number,
      tradeName: PropTypes.string,
    }),
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    className: PropTypes.string,
    consumptionUnit: PropTypes.string,
    timeZone: PropTypes.string,
    rushStartTime: PropTypes.object,
    rushEndTime: PropTypes.object,
    rushValue: PropTypes.number,
    outRushValue: PropTypes.number,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  units: PropTypes.array.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(DefaultFareForm);
