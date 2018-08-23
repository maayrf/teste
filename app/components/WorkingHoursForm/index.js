/**
 *
 * WorkingHoursForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row, Col, DatePicker, Checkbox } from 'antd';
import { compose } from 'redux';
import TimeSheet from '../TimeSheet/index';
import { DATE_FORMAT_PTBR } from '../DateRangePicker/constants';
import moment from 'moment';
import { defaultWeekHours } from '../TimeSheet/constants';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class WorkingHoursForm extends Component {
  state = {
    weekHours: null,
    hasEndDate: false,
  };
  componentDidMount() {
    const { form, workingHours } = this.props;
    window.form = form;
    if (workingHours && workingHours.startDate && !!workingHours.endDate) {
      this.setState({
        hasEndDate: true,
      });
    }
    if (this.isEditing(workingHours)) {
      this.setState({ hasEndDate: true });
    }
    form.validateFields();
  }

  getError(prop) {
    const { isFieldTouched, getFieldError } = this.props.form;
    return isFieldTouched(prop) && getFieldError(prop);
  }

  getFieldRule = (prop) => {
    const rules = {
      range: [
        {
          validator: (rule, value, cb) => {
            if (!value || !value[0] || !value[1]) {
              return cb('Por favor, preencha o período de funcionamento!');
            }
            cb();
          },
        },
      ],
      startDate: [
        {
          required: true,
          message: 'Por favor, preencha a data inicial de funcionamento!',
        },
      ],
    };
    const finalRule = rules[prop];
    const customValidation = this.props.customValidation[prop];
    return customValidation ? [...finalRule, customValidation] : finalRule;
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
    let data = [];
    if (this.state.weekHours) {
      data = this.formatFormValues(this.state.weekHours);
      this.props.onSubmit(data);
      return;
    }
    data = this.formatFormValues();
    this.props.onSubmit(data);
  };

  isEditing = (workingHours) => {
    if (workingHours && !isNaN(workingHours.id)) return true;
    return false;
  };

  formatFormValues = (weekHours = defaultWeekHours) => {
    const { workingHours } = this.props;
    const { hasEndDate } = this.state;

    const workingHoursDates = this.props.form.getFieldsValue();
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    let values = {
      timeZone,
      workingHours: weekHours,
    };

    if (hasEndDate) {
      values = {
        ...values,
        startDate: workingHoursDates.range[0],
        endDate: workingHoursDates.range[1],
      };
    } else {
      values = {
        ...values,
        startDate: workingHoursDates.startDate,
      };
    }

    if (this.isEditing(workingHours)) {
      values = {
        ...values,
        id: workingHours.id,
      };
    }
    return values;
  };

  renderTimeSheet() {
    const { workingHours } = this.props;
    const props = {
      editable: true,
      onSelect: (weekHours) => this.setState({ weekHours }),
    };
    if (
      workingHours &&
      workingHours.workingHours &&
      workingHours.workingHours.length
    ) {
      props.weekHours = workingHours.workingHours;
    }
    return <TimeSheet {...props} />;
  }

  onChangeDateType = () => {
    this.setState({ hasEndDate: !this.state.hasEndDate }, () => {
      this.props.form.validateFields(['range', 'startDate'], { force: true });
    });
  };

  renderCheckBox = () => (
    <Checkbox
      checked={this.state.hasEndDate}
      onChange={() => this.onChangeDateType()}
    >
      Quero preencher uma data de fim.
    </Checkbox>
  );

  getInitialValue = (value) => {
    const { workingHours } = this.props;
    const { startDate, endDate } = workingHours;

    switch (value) {
      case 'range':
        return [startDate, endDate];
      case 'startDate':
        return startDate;
      default:
        return workingHours[value];
    }
  };

  renderDates = () => {
    const { getFieldDecorator } = this.props.form;
    const startDateError = this.getError('startDate');
    const rangeError = this.getError('range');
    return (
      <div>
        {this.state.hasEndDate ? (
          <FormItem
            label="Período de funcionamento:"
            validateStatus={rangeError ? 'error' : ''}
            help={rangeError || ''}
          >
            {getFieldDecorator('range', {
              rules: this.getFieldRule('range'),
              initialValue: this.getInitialValue('range'),
            })(<RangePicker format={DATE_FORMAT_PTBR} />)}
          </FormItem>
        ) : (
          <FormItem
            label="A partir de:"
            validateStatus={startDateError ? 'error' : ''}
            help={startDateError || ''}
          >
            {getFieldDecorator('startDate', {
              rules: this.getFieldRule('startDate'),
              initialValue: this.getInitialValue('startDate'),
            })(<DatePicker format={DATE_FORMAT_PTBR} />)}
          </FormItem>
        )}
      </div>
    );
  };

  render() {
    const valid = !this.hasErrors();
    const { loading, workingHours } = this.props;

    return (
      <div className="workingHours-form">
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit();
          }}
          className="workingHours-form"
        >
          <Row type="flex" align="middle" gutter={25}>
            <Col>{this.renderDates()}</Col>
            <Col>{this.renderCheckBox()}</Col>
          </Row>
          <p className="_uppercase _margin-bottom">
            Selecione as células abaixo para registrar o novo quadro de horários
          </p>
          {this.renderTimeSheet()}
          <Row type="flex" justify="end">
            <Button onClick={this.handleCancel}>Cancelar</Button>
            <Button
              loading={loading}
              disabled={!valid}
              onClick={() => this.handleSubmit()}
              type="primary"
            >
              {this.isEditing(workingHours) ? 'Salvar' : 'Cadastrar'}
            </Button>
          </Row>
        </Form>
      </div>
    );
  }
}

WorkingHoursForm.defaultProps = {
  customValidation: {},
};
WorkingHoursForm.propTypes = {
  customValidation: PropTypes.object,
  form: PropTypes.object.isRequired,
  workingHours: PropTypes.shape({
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    workingHours: PropTypes.array,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(WorkingHoursForm);
