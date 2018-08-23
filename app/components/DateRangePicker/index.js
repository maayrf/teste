/**
 *
 * DateRange
 *
 */

import React, { Component } from 'react';
import { DatePicker, Row } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  FIFTEEN_MINUTES,
  ONE_DAY,
  ONE_HOUR,
  ONE_MONTH,
  ONE_WEEK,
  THIRTY_MINUTES,
  RAW_DATA,
} from '../../containers/MetersTreeFilter/constants';
import { DATE_OPTIONS, MIN_MAX_BY_FILTER, TIME_OPTIONS } from './constants';
import {
  formatDatesByMaxRangeInHours,
  formatDatesForMinutesScales,
} from './utils';
const { RangePicker } = DatePicker;

class DateRangePicker extends Component {
  state = {
    previewDate: null,
  };

  componentDidUpdate(prevProps) {
    const { step } = this.props;
    if (step !== prevProps.step) {
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

  onChange = (values) => {
    const newValues = this.formatRangePickerValuesByType(values);
    const dateFormat = this.getDateOptions().format;
    this.props.onChange(
      newValues,
      newValues.map((date) => date.format(dateFormat))
    );
  };

  onOpenChange = (opened) => {
    if (!opened) {
      this.setState({
        previewDate: null,
      });
    }
  };

  getDateOptions = () => {
    const {
      step,
      disabled,
      value: [startDate, endDate],
    } = this.props;
    if (disabled) return { disabled };
    if (step === null) return {};

    const timeOptions = TIME_OPTIONS[step];
    const dateOptions = DATE_OPTIONS[step];

    switch (step) {
      case FIFTEEN_MINUTES:
        dateOptions.disabledDate = this.disabledDatesForFifteenMinutes;
        break;
      case THIRTY_MINUTES:
        dateOptions.disabledDate = this.disabledDatesForThirtyMinutes;
        break;
      case ONE_HOUR:
        dateOptions.disabledDate = this.disabledDatesForHour;
        break;
      case ONE_DAY:
        dateOptions.disabledDate = this.disabledDatesForDay;
        break;
      case ONE_WEEK:
        dateOptions.disabledDate = this.disabledDatesForWeek;
        break;
      case ONE_MONTH:
        dateOptions.disabledDate = this.disabledDatesForMonth;
        break;
      default:
        break;
    }

    return {
      ...dateOptions,
      value: [startDate, endDate],
      showTime: timeOptions || false,
      onOpenChange: this.onOpenChange,
      onChange: this.onChange,
      onCalendarChange: this.onCalendarChange,
      defaultValue: moment('DD/MM/YYYY HH:mm')
        .seconds(0)
        .minutes(0),
    };
  };

  disabledDatesForDay = (dayValue) => {
    const { previewDate } = this.state;
    if (previewDate === null) {
      return false;
    }

    return (
      Math.abs(moment
        .duration(previewDate
          .hours(0)
          .minutes(0)
          .seconds(0)
          .diff(dayValue
            .hours(0)
            .minutes(0)
            .seconds(0)))
        .asDays()) >= MIN_MAX_BY_FILTER[ONE_DAY].maxByDates
    );
  };

  disabledDatesForHour = (dayValue) => {
    const { previewDate } = this.state;
    if (previewDate === null || !dayValue) {
      return false;
    }
    return (
      Math.abs(moment
        .duration(previewDate
          .clone()
          .hours(0)
          .minutes(0)
          .seconds(0)
          .diff(dayValue
            .clone()
            .hours(0)
            .minutes(0)
            .seconds(0)))
        .asDays()) >= 2
    );
  };

  disabledDatesForThirtyMinutes = (dayValue) => {
    const { previewDate } = this.state;
    if (previewDate === null || dayValue === null) {
      return false;
    }
    return (
      Math.abs(moment
        .duration(previewDate
          .clone()
          .hours(0)
          .minutes(0)
          .seconds(0)
          .diff(dayValue
            .clone()
            .hours(0)
            .minutes(0)
            .seconds(0)))
        .asDays()) >= 2
    );
  };

  disabledDatesForFifteenMinutes = (dayValue) => {
    const { previewDate } = this.state;
    if (previewDate === null || dayValue === null) {
      return false;
    }
    return (
      Math.abs(moment
        .duration(previewDate
          .clone()
          .hours(0)
          .minutes(0)
          .seconds(0)
          .diff(dayValue
            .clone()
            .hours(0)
            .minutes(0)
            .seconds(0)))
        .asDays()) >= 2
    );
  };

  disabledDatesForWeek = (dayValue) => {
    const { previewDate } = this.state;
    if (previewDate === null) {
      return false;
    }
    const isSameDate = previewDate.isSame(dayValue);
    const isDifferentWeekDay = previewDate.day() !== dayValue.day();
    if (isSameDate) {
      return true;
    }
    const maxPermittedInWeeks = MIN_MAX_BY_FILTER[ONE_WEEK].maxByWeeks;
    const diffInWeeks = Math.abs(moment
      .duration(previewDate
        .clone()
        .minutes(0)
        .hours(0)
        .seconds(0)
        .diff(dayValue
          .clone()
          .minutes(0)
          .hours(0)
          .seconds(0)))
      .asWeeks());
    const isGreaterThanMaxDate = diffInWeeks > maxPermittedInWeeks;
    if (isGreaterThanMaxDate) {
      return true;
    }
    if (isDifferentWeekDay) {
      return true;
    }
    return false;
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

  formatRangePickerValuesByType = (values) => {
    const { step } = this.props;
    const minMaxValues = MIN_MAX_BY_FILTER[step];

    let newValues = values.map((v) => v.second(0));

    if (step === FIFTEEN_MINUTES) {
      newValues = formatDatesForMinutesScales(newValues, 15);
      newValues = formatDatesByMaxRangeInHours(
        newValues[0],
        newValues[1],
        minMaxValues.maxByHours
      );
    }
    if (step === THIRTY_MINUTES) {
      newValues = formatDatesForMinutesScales(newValues, 30);
      newValues = formatDatesByMaxRangeInHours(
        newValues[0],
        newValues[1],
        minMaxValues.maxByHours
      );
    }
    if (step === ONE_HOUR) {
      if (newValues.length > 0) {
        newValues = formatDatesForMinutesScales(newValues, 30);
        const [startDate] = newValues;
        let endDate = newValues[1];
        const diffHours = moment.duration(endDate.diff(startDate)).asHours();
        if (diffHours < 1) {
          // TODO: Method .add is depreceted
          endDate = moment(startDate).add(1, 'h');
        }
        if (diffHours > minMaxValues.maxByHours) {
          endDate = moment(startDate).add(minMaxValues.maxByHours, 'h');
        }
        newValues = [startDate, endDate];
      }
    }
    if (
      step === ONE_DAY ||
      step === ONE_WEEK ||
      step === ONE_MONTH ||
      step === RAW_DATA
    ) {
      return newValues.map((v) => v.minutes(0).hour(0));
    }
    return newValues;
  };

  render() {
    const defaultRangePickerProps = this.getDateOptions();
    return (
      <div>
        <Row type="flex" justify="start" align="middle" gutter={80}>
          <h4>Data de Início</h4>
          <h4>Data de Fim</h4>
        </Row>
        <RangePicker {...defaultRangePickerProps} />
      </div>
    );
  }
}

DateRangePicker.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  step: PropTypes.string,
  value: PropTypes.array,
};
DateRangePicker.defaultProps = {
  value: [],
  onChange: () => {},
};

export default DateRangePicker;
