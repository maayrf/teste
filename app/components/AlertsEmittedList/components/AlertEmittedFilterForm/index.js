/**
 *
 * AlertEmittedFilterForm
 *
 */

import React, { Component } from 'react';
import { Form, Input, Button, Row, Radio } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import './style.less';
import {
  allRadioButtonValue,
  resolvedRadioButtonValue,
  unsolvedRadioButtonValue,
} from './constants';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AlertEmittedFilterForm extends Component {
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
          <FormItem label="Nome do alerta">
            {getFieldDecorator('searchName')(<Input />)}
          </FormItem>
          <FormItem label="Nome do Medidor">
            {getFieldDecorator('searchEggName')(<Input />)}
          </FormItem>
          <FormItem label="Nome do Grupo">
            {getFieldDecorator('searchGroupingName')(<Input />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('searchStatus', {
              initialValue: 3,
            })(<RadioGroup>
              <Radio value={resolvedRadioButtonValue}>Resolvidos</Radio>
              <Radio value={unsolvedRadioButtonValue}>Não resolvidos</Radio>
              <Radio value={allRadioButtonValue}>Todos</Radio>
            </RadioGroup>)}
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

AlertEmittedFilterForm.propTypes = {
  onSubmit: PropTypes.func,
  form: PropTypes.object.isRequired,
};

AlertEmittedFilterForm.defaultProps = {
  onSubmit: () => {},
};

const withFormCreate = Form.create();
export default compose(withFormCreate)(AlertEmittedFilterForm);
