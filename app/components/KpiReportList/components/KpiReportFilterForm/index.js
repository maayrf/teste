/**
 *
 * KpiReportFilterForm
 *
 */

import React, { Component } from 'react';
import { Form, Input, Button, Row } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import SelectPerformanceConfigurationWithLoad from '../../../../containers/SelectPerformanceConfigurationWithLoad';
import './style.less';
const FormItem = Form.Item;

class KpiReportFilterForm extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    const values = this.props.form.getFieldsValue();
    this.props.onSubmit(values);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="alert-emitted-filter-form">
        <Row type="flex" gutter={20} align="bottom">
          <FormItem label="Tipo de Configuração de Performance">
            {getFieldDecorator('searchConfigurationPerformanceId', {
              initialValue: '',
            })(<SelectPerformanceConfigurationWithLoad />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Filtrar
            </Button>
          </FormItem>
        </Row>
      </Form>
    );
  }
}

KpiReportFilterForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object.isRequired,
};

KpiReportFilterForm.defaultProps = {
  onSubmit: () => {},
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(KpiReportFilterForm);
