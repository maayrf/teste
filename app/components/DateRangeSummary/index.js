/**
 *
 * ConsumptionByRangeSummaryList
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Form, Radio, DatePicker, List, Row } from 'antd';
import moment from 'moment';
import LoadingCard from '../LoadingCard/index';
import './style.less';
import { formatToDecimal } from '../../utils/formatNumber';
import { getAnalysisIntervalLabel } from '../AlertConfigurationForm/utils';
import {
  ANALYSIS_INTERVAL_ONE_MONTH,
  TYPE_CONSUMPTION,
  TYPE_FINANCIAL_COST,
  TYPE_POWER,
  TYPE_POWER_FACTOR,
} from '../AlertConfigurationForm/constants';
const InputGroup = Input.Group;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { RangePicker } = DatePicker;
const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

class DateRangeSummary extends Component {
  state = {
    previewDate: null,
  };
  componentDidUpdate(prevProps) {
    const {
      value: { rangeDate },
      // dateRangeSummary,
    } = this.props;
    if (rangeDate !== prevProps.value.rangeDate) {
      // TODO: Verify if there is another solution
      this.setState({
        previewDate: null,
      });
    }
  }
  onCalendarChange = (dates) => {
    if (dates.length === 1) {
      this.setState({
        previewDate: dates[0].clone().seconds(0),
      });
    } else {
      this.setState({
        previewDate: null,
      });
    }
  };
  onChangeSummary = ({ target: { value } }) => {
    const { dateRangeSummary } = this.props;
    this.onChange({
      ...this.props.value,
      summary: { selectedKey: value, values: dateRangeSummary },
    });
  };
  onChange = (value) => {
    this.props.onChange(value);
  };
  onChangeRangePicker = (values) => {
    this.props.onRangeDateChange(values);
    this.onChange({
      ...this.props.value,
      rangeDate: values,
    });
  };
  onChangePercentage = (value) => {
    this.onChange({
      ...this.props.value,
      percentage: value,
    });
  };

  handleDisabledDate = (dayValue) => {
    const { previewDate } = this.state;
    if (
      dayValue.isSameOrAfter(moment()
        .minutes(0)
        .seconds(0)
        .hours(0))
    ) {
      return true;
    }
    if (previewDate === null) {
      return false;
    }
    switch (this.props.analysisInterval) {
      case ANALYSIS_INTERVAL_ONE_MONTH:
        return this.disabledDatesForMonth(dayValue);
    }
  };
  disabledDatesForMonth = (dayValue) => {
    const { previewDate } = this.state;
    if (previewDate === null) {
      return false;
    }

    const previewDateNoDaysNoTime = previewDate
      .clone()
      .date(1)
      .minutes(0)
      .hours(0)
      .seconds(0);
    const currentDateNoDaysNoTime = dayValue
      .clone()
      .date(1)
      .minutes(0)
      .hours(0)
      .seconds(0);
    const diffInMonths = moment
      .duration(currentDateNoDaysNoTime.diff(previewDateNoDaysNoTime))
      .asMonths();

    if (Math.abs(diffInMonths) > 24) {
      return true;
    }

    if (previewDate.isSame(dayValue)) {
      return true;
    }

    const isDifferentMonthYear = !currentDateNoDaysNoTime.isSame(previewDateNoDaysNoTime);
    if (isDifferentMonthYear) {
      if (
        previewDate.date() >
        dayValue
          .clone()
          .endOf('month')
          .date()
      ) {
        return (
          dayValue.date() !==
          dayValue
            .clone()
            .endOf('month')
            .date()
        );
      }
      return previewDate.date() !== dayValue.date();
    }
    return true;
  };
  canShowNextStep = () => {
    const { dateRangeSummary } = this.props;
    const { rangeDate } = this.props.value;
    return (
      !!Object.keys(dateRangeSummary).length &&
      !!rangeDate &&
      !!rangeDate.length
    );
  };

  getTenseOfIntervalWord = (analysisInterval) => {
    if (analysisInterval === ANALYSIS_INTERVAL_ONE_MONTH) return 'intervalo';
    return 'intervalos';
  };

  calculateValue = (value, percentage) =>
    formatToDecimal(value * (percentage / 100));

  getConsumptionOrFinancialCostPhrase() {
    const analysisIntervalLabel = getAnalysisIntervalLabel(this.props.analysisInterval);
    const intervalTense = this.getTenseOfIntervalWord(this.props.analysisInterval);

    return (
      <p>
        Ao dividir este período em {intervalTense} de {analysisIntervalLabel},
        podemos usar o valor máximo, mínimo ou médio para efetuar a comparação.
      </p>
    );
  }

  getDateRangeSummaryPhrase(alertType) {
    switch (alertType) {
      case TYPE_CONSUMPTION:
        return this.getConsumptionOrFinancialCostPhrase();
      case TYPE_FINANCIAL_COST:
        return this.getConsumptionOrFinancialCostPhrase();
      case TYPE_POWER:
        return (
          <p>
            Baseando-se no período selecionado, podemos usar o valor médio,
            máximo ou mínimo para efetuar a comparação.
          </p>
        );
      case TYPE_POWER_FACTOR:
        return (
          <p>
            Baseando-se no período selecionado, podemos usar o valor médio,
            máximo ou mínimo para efetuar a comparação.
          </p>
        );
      default:
        return null;
    }
  }

  renderSummary() {
    const { dateRangeSummary, loadingSummary, alertType } = this.props;
    const { summary, percentage } = this.props.value;
    if (!this.canShowNextStep()) {
      return '';
    }
    const dateRangeSummaryPhrase = this.getDateRangeSummaryPhrase(alertType);
    return (
      <LoadingCard
        loading={loadingSummary}
        className={loadingSummary ? 'summary-loaded' : ''}
      >
        {dateRangeSummaryPhrase}
        <FormItem label="Selecione uma das opções abaixo para compor o alerta">
          <RadioGroup
            size="large"
            onChange={this.onChangeSummary}
            value={summary.selectedKey}
          >
            {Object.keys(dateRangeSummary).map((key) => (
              <RadioButton
                key={key}
                value={key}
                className="range-summary-option"
              >
                <div>
                  <h3>{dateRangeSummary[key].title}</h3>
                  <List
                    itemLayout="horizontal"
                    dataSource={dateRangeSummary[key].items}
                    renderItem={(item) => (
                      <ListItem>
                        <ListItemMeta
                          title={
                            <Row type="flex" justify="space-between">
                              <div>
                                <strong>{item.name}</strong>
                              </div>
                              <div>
                                {`${percentage}% de ${formatToDecimal(item.value)} ${item.unit} = ${this.calculateValue(
                                  item.value,
                                  percentage
                                )} ${item.unit}`}
                              </div>
                            </Row>
                          }
                        />
                      </ListItem>
                    )}
                  />
                </div>
              </RadioButton>
            ))}
          </RadioGroup>
        </FormItem>
      </LoadingCard>
    );
  }
  render() {
    const { percentage, rangeDate } = this.props.value;
    return (
      <div className="dateRangeSummary">
        <FormItem label="Com que período deseja comparar?">
          <RangePicker
            onCalendarChange={this.onCalendarChange}
            disabledDate={this.handleDisabledDate}
            value={rangeDate}
            onChange={this.onChangeRangePicker}
            format="DD/MM/YYYY"
          />
        </FormItem>
        {this.renderSummary()}
        {this.canShowNextStep() && (
          <FormItem label="Porcentagem do valor selecionado a ser usada na comparação">
            <InputGroup compact>
              <InputNumber
                style={{ textAlign: 'right' }}
                min={1}
                value={percentage}
                onChange={this.onChangePercentage}
              />
              <Input style={{ width: '36px' }} disabled value="%" />
            </InputGroup>
          </FormItem>
        )}
      </div>
    );
  }
}

DateRangeSummary.propTypes = {
  loadingSummary: PropTypes.bool,
  onChange: PropTypes.func,
  onRangeDateChange: PropTypes.func,
  dateRangeSummary: PropTypes.object,
  analysisInterval: PropTypes.string,
  value: PropTypes.shape({
    percentage: PropTypes.number,
    summary: PropTypes.object,
    rangeDate: PropTypes.array,
  }),
};
DateRangeSummary.defaultProps = {
  analysisInterval: null,
  loadingSummary: false,
  onRangeDateChange: () => {},
  onChange: () => {},
  dateRangeSummary: {},
  value: {
    percentage: 100,
    summary: {
      key: null,
      value: null,
    },
    rangeDate: [null, null],
  },
};
export default DateRangeSummary;
