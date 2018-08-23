/**
 *
 * AlertConfigurationForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
  Checkbox,
  Tag,
  List,
  Row,
} from 'antd';
import moment from 'moment';
import { compose } from 'redux';
import Stepper from '../Stepper/Stepper';
import MeterTreeContainer from '../../containers/MeterTreeContainer';
import './style.less';
import InputDecimalNumber from '../InputDecimalNumber';
import UserMailAutoCompleteSelectContainer from '../../containers/UserMailAutoCompleteSelectContainer';
import { formatToDecimal } from '../../utils/formatNumber';
import {
  ALERT_CONDITION_CONSUMPTION_COMPARED_VALUE,
  ALERT_CONDITION_CONSUMPTION_SPECIFIC_VALUE,
  ANALYSIS_INTERVAL,
  ANALYSIS_INTERVAL_ONE_MONTH,
  ALERT_TYPES,
  FIELDS_BY_STEP,
  ALERT_CONDITIONS,
  TYPE_CONSUMPTION,
  TYPE_FINANCIAL_COST,
  TYPE_POWER,
  TYPE_POWER_FACTOR,
  UNIT_OPTIONS,
  ALERT_CONDITION_POWER_MORE_THAN_SPECIFIC_VALUE,
  ALERT_CONDITION_POWER_LESS_THAN_SPECIFIC_VALUE,
  ALERT_CONDITION_POWER_MORE_THAN_COMPARED_VALUE,
  ALERT_CONDITION_POWER_LESS_THAN_COMPARED_VALUE,
  PERMANENCE_TYPES,
  PERMANENCE_TYPE_INSTANTLY,
  SPECIFIC_VALUES_DECIMAL_OPTIONS,
  ANALYSIS_FREQUENCY,
} from './constants';
import {
  getAnalysisIntervalLabel,
  getPermanenceTagLabel,
  getTypeLabel,
} from './utils';
import { DATE_FORMAT_PTBR } from '../DateRangePicker/constants';
import ConsumptionByRangeSummaryContainer from '../../containers/ConsumptionByRangeSummaryContainer';
import FinancialCostByRangeSummaryContainer from '../../containers/FinancialCostByRangeSummaryContainer';
import PowerByRangeSummaryContainer from '../../containers/PowerByRangeSummaryContainer';
const StepperStep = Stepper.Step;
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { Option } = Select;
const InputGroup = Input.Group;
const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

const getSummaryComponent = (type) => {
  switch (type) {
    case TYPE_CONSUMPTION:
      return ConsumptionByRangeSummaryContainer;
    case TYPE_FINANCIAL_COST:
      return FinancialCostByRangeSummaryContainer;
    case TYPE_POWER:
      return PowerByRangeSummaryContainer;
    default:
      return null;
  }
};

class AlertConfigurationForm extends Component {
  componentDidMount() {
    const { form } = this.props;
    form.validateFields();
  }
  onTypeChange = () => {
    this.props.form.resetFields([
      'alertCondition',
      'analysisInterval',
      'comparedValueSummary',
    ]);
  };
  onFinish = () => {
    const values = this.props.form.getFieldsValue();
    const newValues = Object.keys(values).reduce((beforeObject, currentKey) => {
      if (!values[currentKey]) {
        return beforeObject;
      }
      return {
        ...beforeObject,
        [currentKey]: values[currentKey],
      };
    }, {});
    newValues.meters = newValues.meters.map((meter) => ({
      id: meter.id,
      className: meter.className,
      value: newValues.value,
      unit: newValues.unit,
    }));

    if (newValues.comparedValueSummary) {
      const {
        values: summaryValues,
        selectedKey,
      } = newValues.comparedValueSummary.summary;
      const {
        rangeDate: [startDate, endDate],
      } = newValues.comparedValueSummary;
      newValues.meters = summaryValues[selectedKey].items.map((meter) => ({
        ...meter,
        value: meter.value * (newValues.comparedValueSummary.percentage / 100),
      }));
      newValues.rangeDatesToCompare = {
        startDate,
        endDate,
      };
      newValues.percentage = newValues.comparedValueSummary.percentage;
      newValues.selectedSummaryOption = selectedKey;
    }

    if (newValues.mailTo) {
      newValues.mailTo = newValues.mailTo.map((mail) => mail.key);
    }
    delete newValues.customMessage;
    delete newValues.comparedValueSummary;
    delete newValues.isAnalysisIntervalMonthInDifferentDay;
    delete newValues.isWithEmail;
    delete newValues.value;
    this.props.onFinish(newValues);
  };
  getSelectedSummaryOptionLabel = () => {
    const { getFieldValue } = this.props.form;
    const comparedValueSummary = getFieldValue('comparedValueSummary');
    if (
      !(
        comparedValueSummary.summary &&
        comparedValueSummary.summary.selectedKey &&
        comparedValueSummary.summary.values &&
        !!Object.keys(comparedValueSummary.summary.values).length
      )
    ) {
      return '';
    }
    return comparedValueSummary.summary.values[
      comparedValueSummary.summary.selectedKey
    ].title;
  };
  getRangeDate = () => {
    const { getFieldValue } = this.props.form;
    const comparedValueSummary = getFieldValue('comparedValueSummary');
    return comparedValueSummary.rangeDate ? comparedValueSummary.rangeDate : [];
  };
  getInitialValue = (key) => {
    const { alertConfiguration } = this.props;
    if (alertConfiguration) {
      switch (key) {
        case 'rangeDatesToCompare':
          return [
            moment(alertConfiguration.rangeDatesToCompare.startDate),
            moment(alertConfiguration.rangeDatesToCompare.endDate),
          ];
        case 'mailTo':
          return alertConfiguration.mailTo.map((mail) => ({
            key: mail,
            label: mail,
          }));
        default:
          return alertConfiguration[key];
      }
    }
    switch (key) {
      case 'percentage':
        return 100;
      case 'mailTo':
        return [];
      default:
        return null;
    }
  };
  getSelectedMetersFromSummary = () => {
    if (this.isUpdate()) {
      return this.getInitialValue('meters');
    }
    const comparedValuesSummary = this.props.form.getFieldValue('comparedValueSummary');
    const { values, selectedKey } = comparedValuesSummary.summary;
    return values[selectedKey].items.map((meter) => ({
      ...meter,
      value: meter.value * (comparedValuesSummary.percentage / 100),
      originalValue: meter.value,
    }));
  };
  getStepsLoaded = () => this.canGoToFinalSteps();
  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  }
  getAlertConditionOptions = () => {
    const { getFieldValue } = this.props.form;
    const analysisInterval = getFieldValue('analysisInterval');
    const alertType = getFieldValue('type');
    return ALERT_CONDITIONS[alertType].map((alertCondition) => ({
      ...alertCondition,
      label: alertCondition.getLabel(alertType, analysisInterval),
    }));
  };
  isUpdate = () => !!this.props.alertConfiguration;
  calculateValue = (value, percentage = 100) =>
    formatToDecimal(value * (percentage / 100));
  isStepValid = (stepKey) => {
    const { isFieldTouched, getFieldsError } = this.props.form;
    const fieldsOfStep = FIELDS_BY_STEP[stepKey];
    const errors = getFieldsError(fieldsOfStep);
    if (!this.isUpdate()) {
      if (!fieldsOfStep.every((fs) => isFieldTouched(fs))) {
        return false;
      }
    }
    return !Object.keys(errors).some((key) => errors[key]);
  };
  isValid = (prop) => {
    const { isFieldTouched, getFieldError } = this.props.form;
    const error = getFieldError(prop);
    return !!isFieldTouched(prop) && !error;
  };
  canGoToFinalSteps = () => {
    const { getFieldValue } = this.props.form;
    const alertCondition = getFieldValue('alertCondition');
    let canGoToNextStep = false;
    switch (alertCondition) {
      case ALERT_CONDITION_CONSUMPTION_SPECIFIC_VALUE:
        canGoToNextStep = this.isStepValid('fixedValue');
        break;
      case ALERT_CONDITION_CONSUMPTION_COMPARED_VALUE:
        canGoToNextStep = this.isStepValid('comparedValue');
        break;
      case ALERT_CONDITION_POWER_MORE_THAN_COMPARED_VALUE:
        canGoToNextStep = this.isStepValid('comparedValue');
        break;
      case ALERT_CONDITION_POWER_LESS_THAN_COMPARED_VALUE:
        canGoToNextStep = this.isStepValid('comparedValue');
        break;
      case ALERT_CONDITION_POWER_MORE_THAN_SPECIFIC_VALUE:
        canGoToNextStep = this.isStepValid('fixedValue');
        break;
      case ALERT_CONDITION_POWER_LESS_THAN_SPECIFIC_VALUE:
        canGoToNextStep = this.isStepValid('fixedValue');
        break;
      default:
        canGoToNextStep = false;
        break;
    }
    return canGoToNextStep;
  };
  renderTitleIfIsUpdate = () => {
    if (this.isUpdate()) {
      return <h1>Editando o Alerta: {this.props.alertConfiguration.name}</h1>;
    }
    return '';
  };
  renderWaysToBeAlertStep = () => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const isWithEmailCheckbox = getFieldDecorator('isWithEmail', {
      valuePropName: 'checked',
      initialValue: !!(
        this.getInitialValue('mailTo') && this.getInitialValue('mailTo').length
      ),
    })(<Checkbox>Desejo alertar por email também</Checkbox>);
    const isWithEmail = getFieldValue('isWithEmail');
    return (
      <StepperStep key="how" title="Deseja ser alertado por email?" stepsLoaded>
        <h1>Você deseja ser alertado por email também?</h1>
        {isWithEmailCheckbox}
        {isWithEmail && (
          <FormItem label="Insira os emails que deseja enviar o alerta">
            {getFieldDecorator('mailTo', {
              initialValue: this.getInitialValue('mailTo'),
            })(<UserMailAutoCompleteSelectContainer />)}
          </FormItem>
        )}
      </StepperStep>
    );
  };
  renderComparedValueStep() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const type = getFieldValue('type');
    const meters = getFieldValue('meters');
    const analysisInterval = getFieldValue('analysisInterval');
    const SummaryComponent = getSummaryComponent(type);
    const alertType = getFieldValue('type');

    return (
      <StepperStep
        key="comparedValue"
        title="Com que período deseja comparar"
        isValid={this.isStepValid('comparedValue')}
      >
        <h1>Com que período deseja comparar</h1>
        <FormItem>
          {getFieldDecorator('comparedValueSummary', {
            initialValue: {
              percentage: this.getInitialValue('percentage'),
              summary: {
                selectedKey: this.getInitialValue('selectedSummaryOption'),
                values: {},
              },
              rangeDate: this.getInitialValue('rangeDatesToCompare'),
            },
            rules: [
              {
                validator: (rule, { percentage, summary, rangeDate }, cb) => {
                  if (
                    !percentage ||
                    !summary.selectedKey ||
                    rangeDate.length !== 2
                  ) {
                    cb('');
                  }
                  cb();
                },
              },
            ],
          })(<SummaryComponent
            alertType={alertType}
            analysisInterval={analysisInterval}
            meters={meters}
          />)}
        </FormItem>
      </StepperStep>
    );
  }
  renderSpecificValueStep() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const type = getFieldValue('type');
    const { options, initialValue } = UNIT_OPTIONS[type];
    const decimalOptions = SPECIFIC_VALUES_DECIMAL_OPTIONS[type];
    const labelValueAndUnit =
      type === TYPE_POWER_FACTOR
        ? 'Digite o valor a ser utilizado'
        : 'Digite o valor e selecione a unidade';
    return (
      <StepperStep
        key="fixedValue"
        title={labelValueAndUnit}
        isValid={this.isStepValid('fixedValue')}
      >
        <h1>{labelValueAndUnit}</h1>
        <InputGroup compact>
          {getFieldDecorator('value', {
            initialValue: 0,
            rules: [
              {
                required: true,
                message: 'Por favor preencha o campo: Unidade!',
              },
            ],
          })(<InputDecimalNumber
            {...decimalOptions}
            style={{ width: '300px', maxWidth: '80%' }}
          />)}
          {options &&
            getFieldDecorator('unit', {
              initialValue,
              rules: [
                {
                  required: true,
                  message: 'Por favor preencha o campo: Unidade!',
                },
              ],
            })(<Select style={{ width: '100px' }}>
              {options.map(({ label, value }) => (
                <Option value={value}>{label}</Option>
              ))}
            </Select>)}
        </InputGroup>
      </StepperStep>
    );
  }
  renderStepsByAlertCondition() {
    const { getFieldValue } = this.props.form;
    const alertCondition = getFieldValue('alertCondition');
    switch (alertCondition) {
      case ALERT_CONDITION_CONSUMPTION_SPECIFIC_VALUE:
        return this.renderSpecificValueStep();
      case ALERT_CONDITION_CONSUMPTION_COMPARED_VALUE:
        return this.renderComparedValueStep();
      case ALERT_CONDITION_POWER_MORE_THAN_SPECIFIC_VALUE:
        return this.renderSpecificValueStep();
      case ALERT_CONDITION_POWER_LESS_THAN_SPECIFIC_VALUE:
        return this.renderSpecificValueStep();
      case ALERT_CONDITION_POWER_MORE_THAN_COMPARED_VALUE:
        return this.renderComparedValueStep();
      case ALERT_CONDITION_POWER_LESS_THAN_COMPARED_VALUE:
        return this.renderComparedValueStep();
      default:
        return [];
    }
  }
  renderConfirmStep = () => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const customMessage = getFieldValue('customMessage');
    return (
      <StepperStep
        key="confirm"
        title="Revisão & Qual é o nome do seu Alerta?"
        isValid={this.isStepValid('confirm')}
        isLastStep
      >
        <h1>
          Revisando, essa é sua nova regra de alerta. Por favor confira se tudo
          está correto e dê um nome para o mesmo.
        </h1>
        {this.renderConfirmParagraph()}
        <FormItem label="Qual o nome do seu alerta?">
          {getFieldDecorator('name', {
            initialValue: this.getInitialValue('name'),
            rules: [
              { required: true, message: 'Insira o nome para o seu alerta!' },
            ],
          })(<Input autoComplete="name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('customMessage', {
            valuePropName: 'checked',
            initialValue: !!(
              this.getInitialValue('message') &&
              this.getInitialValue('message').length
            ),
          })(<Checkbox>Desejo ter uma mensagem customizada no alerta</Checkbox>)}
        </FormItem>
        {customMessage && (
          <FormItem>
            {getFieldDecorator('message', {
              initialValue: this.getInitialValue('message'),
            })(<TextArea autosize={{ minRows: 3 }} />)}
          </FormItem>
        )}
      </StepperStep>
    );
  };

  renderMails = (mails) => {
    const dot = <span key={mails.length + 2}>.</span>;
    return [...mails, dot];
  };
  renderConfirmParagraphSpecificValue = () => {
    const {
      type,
      meters,
      analysisInterval,
      mailTo,
      value,
      unit,
    } = this.props.form.getFieldsValue([
      'unit',
      'value',
      'type',
      'meters',
      'analysisInterval',
      'mailTo',
    ]);
    const typeLabel = getTypeLabel(type);
    const analysysIntervalLabel = getAnalysisIntervalLabel(analysisInterval);
    const mailsToLabel =
      mailTo && mailTo.length
        ? mailTo.map((mail) => <Tag key={mail.key}>{mail.key}</Tag>)
        : false;
    const medidoresLabel = meters.map((meter) => (
      <Tag key={meter.key}>{meter.tradename || meter.name}</Tag>
    ));
    return (
      <div>
        Se o {typeLabel} do(s) medidores(s) {medidoresLabel}, atingir mais do
        que{' '}
        <Tag>
          {formatToDecimal(value)}
          {unit}
        </Tag>{' '}
        dentro do período de {analysysIntervalLabel} um alerta será emitido.
        {mailsToLabel && ' E quero encaminhar um alerta para os emails: '}
        {mailsToLabel && this.renderMails(mailsToLabel)}
      </div>
    );
  };
  renderConfirmParagraphComparedValue = () => {
    const {
      type,
      analysisInterval,
      mailTo,
      comparedValueSummary,
    } = this.props.form.getFieldsValue([
      'type',
      'analysisInterval',
      'mailTo',
      'comparedValueSummary',
    ]);
    const typeLabel = getTypeLabel(type);
    const analysysIntervalLabel = getAnalysisIntervalLabel(analysisInterval);
    const mailsToLabel =
      mailTo && mailTo.length
        ? mailTo.map((mail) => <Tag key={mail.key}>{mail.key}</Tag>)
        : false;
    const metersSelected = this.getSelectedMetersFromSummary();
    let [startDate, endDate] = this.getRangeDate();
    const selectedSummaryOptionLabel = this.getSelectedSummaryOptionLabel();
    startDate = startDate.format(DATE_FORMAT_PTBR);
    endDate = endDate.format(DATE_FORMAT_PTBR);
    const { percentage } = comparedValueSummary;
    return (
      <div>
        As condições abaixo foram geradas à partir do{' '}
        <Tag>{selectedSummaryOptionLabel}</Tag> de <Tag>{typeLabel}</Tag> no
        período de{' '}
        <Tag>
          {startDate} ~ {endDate}
        </Tag>
        {'. '}
        Caso alguma dessas condições seja atingida dentro do período de{' '}
        <Tag>{analysysIntervalLabel}</Tag>, um alerta será emitido.
        {mailsToLabel && ' E quero encaminhar um alerta para os emails: '}
        {mailsToLabel && this.renderMails(mailsToLabel)}
        <List
          itemLayout="horizontal"
          dataSource={metersSelected}
          renderItem={(item) => (
            <ListItem>
              <ListItemMeta
                title={
                  <Row type="flex" justify="space-between">
                    <div>
                      Se <strong>{item.name}</strong> atingir mais que
                    </div>
                    <div>
                      {`${this.calculateValue(item.value)} ${item.unit}`} = ({
                        percentage
                      }% de {this.calculateValue(item.originalValue)}{' '}
                      {item.unit})
                    </div>
                  </Row>
                }
              />
            </ListItem>
          )}
        />
      </div>
    );
  };
  renderConfirmParagraphPowerComparedValue = () => {
    const {
      mailTo,
      comparedValueSummary,
      permanence,
      alertCondition,
    } = this.props.form.getFieldsValue([
      'mailTo',
      'comparedValueSummary',
      'permanence',
      'alertCondition',
    ]);
    const mailsToLabel =
      mailTo && mailTo.length
        ? mailTo.map((mail) => <Tag key={mail.key}>{mail.key}</Tag>)
        : false;
    const metersSelected = this.getSelectedMetersFromSummary();
    let [startDate, endDate] = this.getRangeDate();
    const selectedSummaryOptionLabel = this.getSelectedSummaryOptionLabel();
    startDate = startDate.format(DATE_FORMAT_PTBR);
    endDate = endDate.format(DATE_FORMAT_PTBR);
    const { percentage } = comparedValueSummary;

    let permanenceLabel = getPermanenceTagLabel(permanence);
    const permanenceLabelAtConditions =
      permanence === PERMANENCE_TYPE_INSTANTLY
        ? 'Imediatamente'
        : `permanecer por ${permanenceLabel}`;
    permanenceLabel =
      permanenceLabel === 'Imediatamente'
        ? 'imediatamente'
        : `permaneça por ${permanenceLabel}`;
    const higherOrLower =
      alertCondition === ALERT_CONDITION_POWER_MORE_THAN_SPECIFIC_VALUE ||
      alertCondition === ALERT_CONDITION_POWER_MORE_THAN_COMPARED_VALUE
        ? 'acima'
        : 'abaixo';

    const permanencePhrase =
      permanence === PERMANENCE_TYPE_INSTANTLY
        ? `seja atingida, um alerta será emitido ${permanenceLabel}.`
        : `${permanenceLabel}, um alerta será emitido.`;

    return (
      <div>
        As condições abaixo foram geradas à partir do{' '}
        <Tag>{selectedSummaryOptionLabel}</Tag> de potência no período de{' '}
        <Tag>
          {startDate} até {endDate}
        </Tag>{' '}
        . Caso alguma destas condições {permanencePhrase}
        {mailsToLabel && ' E quero encaminhar um alerta para os emails: '}
        {mailsToLabel && this.renderMails(mailsToLabel)}
        <List
          itemLayout="horizontal"
          dataSource={metersSelected}
          renderItem={(item) => (
            <ListItem>
              <ListItemMeta
                title={
                  <Row type="flex" justify="space-between">
                    <div>
                      Se <strong>{item.name}</strong>{' '}
                      {permanenceLabelAtConditions} {higherOrLower} de
                    </div>
                    <div>
                      {`${this.calculateValue(item.value)} ${item.unit}`} = ({
                        percentage
                      }% de {this.calculateValue(item.originalValue)}{' '}
                      {item.unit})
                    </div>
                  </Row>
                }
              />
            </ListItem>
          )}
        />
      </div>
    );
  };
  renderConfirmParagraphPowerSpecificValue = () => {
    const {
      type,
      meters,
      alertCondition,
      mailTo,
      value,
      unit,
      permanence,
    } = this.props.form.getFieldsValue([
      'unit',
      'value',
      'type',
      'meters',
      'alertCondition',
      'mailTo',
      'permanence',
    ]);
    const typeLabel = getTypeLabel(type);
    const mailsToLabel =
      mailTo && mailTo.length
        ? mailTo.map((mail) => <Tag key={mail.key}>{mail.key}</Tag>)
        : false;
    const medidoresLabel = meters.map((meter) => (
      <Tag key={meter.key}>{meter.tradename || meter.name}</Tag>
    ));
    let permanenceLabel = getPermanenceTagLabel(permanence);
    permanenceLabel =
      permanenceLabel !== 'Imediatamente'
        ? `durante ${permanenceLabel}`
        : permanenceLabel;
    const reachOrRemain =
      permanence === PERMANENCE_TYPE_INSTANTLY ? 'atingir' : 'permanecer';
    const higherOrLower =
      alertCondition === ALERT_CONDITION_POWER_MORE_THAN_SPECIFIC_VALUE ||
      alertCondition === ALERT_CONDITION_POWER_MORE_THAN_COMPARED_VALUE
        ? 'acima'
        : 'abaixo';

    const wannaEmmitAlertPhrase =
      permanence === PERMANENCE_TYPE_INSTANTLY ? (
        <span>
          quero emitir um alerta <Tag>{permanenceLabel}</Tag>.
        </span>
      ) : (
        <span>
          <Tag>{permanenceLabel}</Tag> quero emitir um alerta.
        </span>
      );
    const typeLabelCondition =
      type === TYPE_POWER_FACTOR ? (
        <span>Se o {typeLabel}</span>
      ) : (
        <span>Se a {typeLabel}</span>
      );
    return (
      <div>
        {typeLabelCondition} do(s) medidor(es) {medidoresLabel}, {reachOrRemain}{' '}
        {higherOrLower} de{' '}
        <Tag>
          {formatToDecimal(value)}
          {unit}
        </Tag>, {wannaEmmitAlertPhrase}
        {mailsToLabel && ' E quero encaminhar um alerta para os emails: '}
        {mailsToLabel && this.renderMails(mailsToLabel)}
      </div>
    );
  };
  renderConfirmParagraph() {
    const alertCondition = this.props.form.getFieldValue('alertCondition');
    switch (alertCondition) {
      case ALERT_CONDITION_CONSUMPTION_SPECIFIC_VALUE:
        return this.renderConfirmParagraphSpecificValue();
      case ALERT_CONDITION_CONSUMPTION_COMPARED_VALUE:
        return this.renderConfirmParagraphComparedValue();
      case ALERT_CONDITION_POWER_MORE_THAN_SPECIFIC_VALUE:
        return this.renderConfirmParagraphPowerSpecificValue();
      case ALERT_CONDITION_POWER_LESS_THAN_SPECIFIC_VALUE:
        return this.renderConfirmParagraphPowerSpecificValue();
      case ALERT_CONDITION_POWER_MORE_THAN_COMPARED_VALUE:
        return this.renderConfirmParagraphPowerComparedValue();
      case ALERT_CONDITION_POWER_LESS_THAN_COMPARED_VALUE:
        return this.renderConfirmParagraphPowerComparedValue();
      default:
        return '';
    }
  }
  renderAnalysisIntervalStep = () => {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const analysisInterval = getFieldValue('analysisInterval');
    const isAnalysisIntervalMonthInDifferentDay = getFieldValue('isAnalysisIntervalMonthInDifferentDay');
    const analysisIntervalIsMonth =
      analysisInterval === ANALYSIS_INTERVAL_ONE_MONTH;
    let validation = 'analysisInterval';
    if (analysisIntervalIsMonth) {
      validation = isAnalysisIntervalMonthInDifferentDay
        ? 'analysisIntervalMonthInDifferentDay'
        : 'analysisIntervalMonth';
    }
    return (
      <StepperStep
        key="analysisInterval"
        title={ANALYSIS_FREQUENCY}
        isValid={this.isStepValid(validation)}
      >
        <FormItem>
          <h1>{ANALYSIS_FREQUENCY}</h1>
          <p>(intervalo de verificação)</p>
          {getFieldDecorator('analysisInterval', {
            initialValue: this.getInitialValue('analysisInterval'),
            rules: [
              { required: true, message: 'Por favor, preencha o campo!' },
            ],
          })(<RadioGroup size="large">
            {ANALYSIS_INTERVAL.map(({ label, value }) => (
              <RadioButton key={value} value={value}>
                {label}
              </RadioButton>
            ))}
             </RadioGroup>)}
        </FormItem>
        {analysisIntervalIsMonth && (
          <div>
            <FormItem>
              <h2>
                Por padrão iniciamos o monitoramento no dia 1 de cada mês. Você
                deseja iniciar o monitoramento em um dia diferente do dia 1?
              </h2>
              {getFieldDecorator('isAnalysisIntervalMonthInDifferentDay', {
                rules: [
                  { required: true, message: 'Por favor, preencha o campo!' },
                ],
              })(<RadioGroup size="large">
                <RadioButton value>Sim</RadioButton>
                <RadioButton value={false}>Não</RadioButton>
              </RadioGroup>)}
            </FormItem>
            {isAnalysisIntervalMonthInDifferentDay && (
              <FormItem>
                <h2>Qual dia você deseja iniciar o monitoramento?</h2>
                {getFieldDecorator('analysisDay', {
                  rules: [
                    { required: true, message: 'Por favor, preencha o campo!' },
                  ],
                })(<InputNumber min={1} max={28} />)}
              </FormItem>
            )}
          </div>
        )}
      </StepperStep>
    );
  };

  handleAlertConditionChange = () => {
    this.props.form.resetFields(['comparedValueSummary']);
  };

  renderAlertConditionStep = () => {
    const { getFieldDecorator } = this.props.form;
    const alertConditionOptions = this.getAlertConditionOptions();
    let initialValue = null;
    if (this.isUpdate()) {
      initialValue = this.getInitialValue('rangeDatesToCompare')
        ? ALERT_CONDITION_CONSUMPTION_COMPARED_VALUE
        : ALERT_CONDITION_CONSUMPTION_SPECIFIC_VALUE;
    }
    return (
      <StepperStep
        key="alertCondition"
        title="Quando você deseja ser notificado?"
        isValid={this.isStepValid('alertCondition')}
      >
        <h1>Quando você deseja ser notificado?</h1>
        {getFieldDecorator('alertCondition', {
          initialValue,
          rules: [{ required: true, message: 'Escolha uma das opções!' }],
        })(<RadioGroup size="large" onChange={this.handleAlertConditionChange}>
          {alertConditionOptions.map(({ label, value }) => (
            <RadioButton
              className="radio-button-flex-height"
              value={value}
              key={value}
            >
              {label}
            </RadioButton>
          ))}
        </RadioGroup>)}
      </StepperStep>
    );
  };
  renderConsumptionSteps = () => {
    let steps = [
      this.renderSelectMetersStep(),
      this.renderAnalysisIntervalStep(),
      this.renderAlertConditionStep(),
      this.renderStepsByAlertCondition(),
    ];

    if (this.canGoToFinalSteps()) {
      steps = [
        ...steps,
        this.renderWaysToBeAlertStep(),
        this.renderConfirmStep(),
      ];
    }
    return steps;
  };
  renderSelectMetersStep = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <StepperStep
        key="meters"
        title="Quais medidores deseja monitorar?"
        isValid={this.isStepValid('meters')}
      >
        <h1>Quais medidores deseja monitorar?</h1>
        <p>
          Cada medidor ou grupo selecionado será avaliado individualmente pelo
          alerta
        </p>
        {getFieldDecorator('meters', {
          valuePropName: 'checkedMeters',
          initialValue: this.getInitialValue('meters')
            ? this.getInitialValue('meters')
            : [],
          rules: [
            {
              validator: (rule, value, cb) => {
                if (!value.length) {
                  cb('Por favor preencha um dos medidores!');
                }
                cb();
              },
            },
          ],
        })(<MeterTreeContainer onChange={this.onClickMeter} />)}
      </StepperStep>
    );
  };
  renderFinancialCostSteps = () => {
    let steps = [
      this.renderSelectMetersStep(),
      this.renderAnalysisIntervalStep(),
      this.renderAlertConditionStep(),
      this.renderStepsByAlertCondition(),
    ];

    if (this.canGoToFinalSteps()) {
      steps = [
        ...steps,
        this.renderWaysToBeAlertStep(),
        this.renderConfirmStep(),
      ];
    }
    return steps;
  };
  renderPermanenceStep = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <StepperStep
        key="permanence"
        title="Tempo de permanência"
        isValid={this.isValid('permanence')}
        stepsLoaded
      >
        <h1>
          Podemos gerar um alerta imediatamente quando o valor for atingido ou
          podemos esperar para que ele permaneça neste valor por um certo
          intervalo de tempo antes de gerar um alerta. Escolha uma das opções a
          seguir:
        </h1>
        <FormItem>
          {getFieldDecorator('permanence', {
            initialValue: this.getInitialValue('permanence'),
            rules: [
              { required: true, message: 'Por favor escolha uma das opções!' },
            ],
          })(<RadioGroup size="large">
            {PERMANENCE_TYPES.map(({ label, value }) => (
              <RadioButton
                className="radio-button-flex-height"
                key={value}
                value={value}
              >
                {label}
              </RadioButton>
            ))}
          </RadioGroup>)}
        </FormItem>
      </StepperStep>
    );
  };
  renderPowerSteps = () => {
    let steps = [
      this.renderSelectMetersStep(),
      this.renderAlertConditionStep(),
      this.renderStepsByAlertCondition(),
    ];

    if (this.canGoToFinalSteps()) {
      steps = [
        ...steps,
        this.renderPermanenceStep(),
        this.renderWaysToBeAlertStep(),
        this.renderConfirmStep(),
      ];
    }
    return steps;
  };
  renderPowerFactorSteps = () => {
    let steps = [
      this.renderSelectMetersStep(),
      this.renderAlertConditionStep(),
      this.renderStepsByAlertCondition(),
    ];

    if (this.canGoToFinalSteps()) {
      steps = [
        ...steps,
        this.renderPermanenceStep(),
        this.renderWaysToBeAlertStep(),
        this.renderConfirmStep(),
      ];
    }
    return steps;
  };
  renderStepsByType(type) {
    switch (type) {
      case TYPE_CONSUMPTION:
        return this.renderConsumptionSteps();
      case TYPE_FINANCIAL_COST:
        return this.renderFinancialCostSteps();
      case TYPE_POWER:
        return this.renderPowerSteps();
      case TYPE_POWER_FACTOR:
        return this.renderPowerFactorSteps();
      default:
        return [];
    }
  }
  renderSteps() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const type = getFieldValue('type');
    const stepsLoaded = this.getStepsLoaded();
    return (
      <Stepper
        stepsLoaded={stepsLoaded}
        onFinish={this.onFinish}
        onStepChange={this.onStepChange}
      >
        <StepperStep
          key="type"
          title="Qual tipo de Alerta você quer criar?"
          isValid={this.isStepValid('type')}
        >
          <h1>Qual tipo de Alerta você quer criar?</h1>
          {getFieldDecorator('type', {
            initialValue: this.getInitialValue('type'),
            rules: [
              { required: true, message: 'Por favor, preencha o campo!' },
            ],
          })(<RadioGroup onChange={this.onTypeChange} size="large">
            {ALERT_TYPES.map(({ label, value }) => (
              <RadioButton key={value} value={value}>
                {label}
              </RadioButton>
            ))}
          </RadioGroup>)}
        </StepperStep>
        {!!type && this.renderStepsByType(type)}
      </Stepper>
    );
  }
  render() {
    return (
      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
        className="alertConfiguration-form"
      >
        {this.renderTitleIfIsUpdate()}
        {this.renderSteps()}
      </Form>
    );
  }
}

AlertConfigurationForm.propTypes = {
  form: PropTypes.object.isRequired,
  onFinish: PropTypes.func,
  alertConfiguration: PropTypes.shape({
    type: PropTypes.string,
    analysisInterval: PropTypes.string,
    analysisDay: PropTypes.number,
    meters: PropTypes.array,
    name: PropTypes.string,
    mailTo: PropTypes.array,
  }),
  loading: PropTypes.bool.isRequired,
};

AlertConfigurationForm.defaultProps = {
  onFinish: () => {},
};
const withFormCreate = Form.create();
export default compose(withFormCreate)(AlertConfigurationForm);
