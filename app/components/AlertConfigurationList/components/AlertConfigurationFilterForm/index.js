/**
 *
 * AlertConfigurationFilterForm
 *
 */

import React, { Component } from 'react';
import { Form, Input, Button, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import './style.less';
const FormItem = Form.Item;
const SelectOption = Select.Option;

class AlertConfigurationFilterForm extends Component {
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
          <FormItem label="Status">
            {getFieldDecorator('searchStatus', { initialValue: '' })(<Select style={{ width: '130px' }}>
              <SelectOption value="">Todos</SelectOption>
              <SelectOption value="active">Ativo</SelectOption>
              <SelectOption value="disable">Desativado</SelectOption>
            </Select>)}
          </FormItem>
          <FormItem label="Nome da Unidade">
            {getFieldDecorator('searchBranchName')(<Input />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Pesquisar
            </Button>
          </FormItem>
        </Row>
      </Form>
    );
  }
}

AlertConfigurationFilterForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object.isRequired,
};

AlertConfigurationFilterForm.defaultProps = {
  onSubmit: () => {},
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(AlertConfigurationFilterForm);
