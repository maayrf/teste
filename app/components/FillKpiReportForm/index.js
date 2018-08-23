/**
 *
 * FillKpiReportForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form, Row, Modal } from 'antd';
import { compose } from 'redux';
import KpiReport from '../KpiReportList/KpiReport';
import KpiCounter from '../KpiReportList/KpiCounter';
import InputDecimalNumber from '../InputDecimalNumber/index';
import moment from 'moment';

const InputGroup = Input.Group;
const FormItem = Form.Item;

class FillKpiReportForm extends Component {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    const { form, fillKpiReport } = this.props;
    if (fillKpiReport) {
      const { id, value } = fillKpiReport;
      form.setFieldsValue({
        id,
        value,
      });
    }
    form.validateFields();
  }

  componentDidUpdate(prevProps) {
    const { success } = this.props;
    const { modalVisible } = this.state;

    if (!!success && !prevProps.success && modalVisible) {
      this.toggleModal();
    }
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
    this.toggleModal();
    // this.props.onCancel();
  };
  handleSubmit = () => {
    if (this.hasErrors()) {
      return;
    }

    const fillKpiReportData = this.props.fillKpiReport
      ? { ...this.props.form.getFieldsValue(), id: this.props.fillKpiReport.id }
      : this.props.form.getFieldsValue();

    /**
     * The getFieldsValue return a key-value object
     * The key is the report id and the value is the report value
     *
     * {
     *   1: "987",
     *   2: "987"
     * }
     *
     * Before send to the API we must
     * transform the form values to an array of object
     */
    const reportKeys = Object.keys(fillKpiReportData);
    const filledKpiReports = reportKeys.map((id) => ({
      id,
      value: fillKpiReportData[id],
    }));

    this.props.onSubmit(filledKpiReports);
    return false;
  };

  toggleModal = () => {
    this.setState(({ modalVisible }) => ({
      modalVisible: !modalVisible,
    }));
  };

  renderReportValue = (value, unit, id) => {
    const { getFieldDecorator } = this.props.form;
    const valueError = this.getError(`${id}`);
    return (
      <FormItem
        validateStatus={valueError ? 'error' : ''}
        help={valueError || ''}
      >
        <InputGroup compact style={{ display: 'flex' }}>
          {getFieldDecorator(`${id}`, {
            initialValue: value,
            rules: [{ required: true, message: 'Insira um valor!' }],
          })(<InputDecimalNumber placeholder="Valor" />)}
          <Input style={{ width: '40px' }} disabled value={unit} />
        </InputGroup>
      </FormItem>
    );
  };

  render() {
    const valid = !this.hasErrors();
    const { loading, date, reports = [] } = this.props;
    const { modalVisible } = this.state;

    const modalFooter = (
      <Row type="flex" justify="end">
        <Button onClick={this.handleCancel}>Cancelar</Button>
        <Button
          loading={loading}
          disabled={!valid}
          onClick={() => this.handleSubmit()}
          type="primary"
        >
          {this.props.fillKpiReport ? 'Editar' : 'Salvar'}
        </Button>
      </Row>
    );

    return (
      <div className="fillKpiReport-form">
        <Modal
          width={700}
          visible={modalVisible}
          onCancel={this.toggleModal}
          footer={modalFooter}
        >
          <Form
            onSubmit={(ev) => {
              ev.preventDefault();
              this.handleSubmit();
            }}
            className="fillKpiReport-form"
          >
            <div className="row -justify-space-between">
              <h2>{moment(date).format('DD/MM/YYYY')}</h2>
              <KpiCounter reports={reports} />
            </div>
            {reports.map(({ id, ...report }) => (
              <KpiReport
                key={id}
                report={report}
                renderValue={(value, unit) =>
                  this.renderReportValue(value, unit, id)
                }
              />
            ))}
          </Form>
        </Modal>
        <Button onClick={this.toggleModal}>Preencher dados</Button>
      </div>
    );
  }
}

FillKpiReportForm.propTypes = {
  form: PropTypes.object.isRequired,
  success: PropTypes.object,
  reports: PropTypes.array,
  fillKpiReport: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(FillKpiReportForm);
