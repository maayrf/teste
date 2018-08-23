/**
 *
 * MetersListFilterForm
 *
 */

import React, { Component } from 'react';
import { Form, Row, Radio } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { ALL_METERS, ACTIVE, INACTIVE } from './constants';
import CompaniesSelectContainer from '../../../../containers/CompaniesSelectContainer';
import { withLoginUser } from '../../../../utils/withLoginUser';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class MetersListFilterForm extends Component {
  handleChangeCompany = (searchCompanyId) => {
    const fields = this.props.form.getFieldsValue();
    this.props.onSubmit({
      ...fields,
      searchCompanyId,
    });
  };
  handleChangeRadioGroup = ({ target: { value: searchStatus } }) => {
    const fields = this.props.form.getFieldsValue();
    this.props.onSubmit({
      ...fields,
      searchStatus,
    });
  };
  isRoot = () => this.props.user.role === 'root';
  render() {
    const { getFieldDecorator } = this.props.form;
    const { showSelectCompanies } = this.props;
    return (
      <Form onSubmit={(ev) => ev.preventDefault()}>
        <Row type="flex" gutter={20} align="bottom">
          {this.isRoot() &&
            showSelectCompanies && (
            <FormItem>
              {getFieldDecorator('searchCompanyId', {
                initialValue: null,
              })(<CompaniesSelectContainer
                onChange={this.handleChangeCompany}
              />)}
            </FormItem>
          )}
          <FormItem>
            {getFieldDecorator('searchStatus', {
              initialValue: '',
            })(<RadioGroup onChange={this.handleChangeRadioGroup}>
              <Radio value={ACTIVE}>Ativos</Radio>
              <Radio value={INACTIVE}>Não ativos</Radio>
              <Radio value={ALL_METERS}>Todos</Radio>
            </RadioGroup>)}
          </FormItem>
        </Row>
      </Form>
    );
  }
}

MetersListFilterForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
  form: PropTypes.object.isRequired,
  showSelectCompanies: PropTypes.bool,
};

MetersListFilterForm.defaultProps = {
  onSubmit: () => {},
  showSelectCompanies: true,
};

const withFormCreate = Form.create();
export default compose(
  withFormCreate,
  withLoginUser
)(MetersListFilterForm);
