/**
 *
 * DashboardFilter
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, DatePicker } from 'antd';
import './style.less';
import CompaniesSelectContainer from '../../../CompaniesSelectContainer';
import BranchesSelectContainer from '../../../BranchesSelectContainer';
import { ROOT_ROLE } from '../../../../utils/constants';

const { MonthPicker } = DatePicker;

const FormItem = Form.Item;

class DashboardFilter extends Component {
  getFilter = () => {
    const {
      currentUser,
      filter: { companyId },
    } = this.props;
    return currentUser.role === ROOT_ROLE ? { companyId } : {};
  };
  getInitialValue = (propName) => this.props.filter[propName] || '';
  handleCompanyId = (companyId) => {
    this.props.onFilterUpdate({
      ...this.props.filter,
      branchId: null,
      companyId,
    });
  };
  handleBranchId = (branchId) => {
    this.props.onFilterUpdate({
      ...this.props.filter,
      branchId,
    });
  };
  handleMonthAndYear = (monthAndYear) => {
    this.props.onFilterUpdate({
      ...this.props.filter,
      monthAndYear,
    });
  };
  isCompanyIdSelected = () => {
    const {
      currentUser,
      filter: { companyId },
    } = this.props;
    return currentUser.role === ROOT_ROLE && companyId;
  };
  render() {
    const {
      getFilter,
      getInitialValue,
      handleCompanyId,
      isCompanyIdSelected,
      handleBranchId,
      handleMonthAndYear,
    } = this;
    const { currentUser } = this.props;
    const { getFieldDecorator } = this.props.form;
    const filter = getFilter();
    return (
      <div className="dashboard-filter">
        <Form onSubmit={this.handleSubmit} className="row">
          {currentUser.role === ROOT_ROLE && (
            <FormItem label="Empresa">
              {getFieldDecorator('companyId', {
                initialValue: getInitialValue('companyId'),
              })(<CompaniesSelectContainer onChange={handleCompanyId} />)}
            </FormItem>
          )}
          <FormItem label="Unidade">
            {getFieldDecorator('branchId', {
              initialValue: getInitialValue('branchId'),
            })(<BranchesSelectContainer
              disable={!isCompanyIdSelected()}
              onChangeBranch={handleBranchId}
              filter={filter}
              style={{ minWidth: 150 }}
            />)}
          </FormItem>
          <FormItem label="Mês">
            {getFieldDecorator('monthAndYear', {
              initialValue: getInitialValue('monthAndYear'),
            })(<MonthPicker
              onChange={handleMonthAndYear}
              format="MMMM [de] YYYY"
            />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

DashboardFilter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterUpdate: PropTypes.func,
  currentUser: PropTypes.object.isRequired,
};

export default Form.create()(DashboardFilter);
