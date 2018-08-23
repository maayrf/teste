/**
 *
 * CompanyInfo Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CompanyInfoForm from '../../components/CompanyInfoForm';

import {
  makeSelectError,
  makeSelectCompanyInfoLoading,
  makeSelectSuccess,
} from './selectors';
import { createCompanyInfo, editCompanyInfo } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import saga from './saga';
import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

class CompanyInfoFormContainer extends Component {
  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
      this.handleCancel();
    }
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = (companyInfoValues) => {
    const { companyInfo } = this.props;
    if (!isNaN(companyInfo.id)) {
      const companyChanges = {
        data: companyInfoValues,
      };
      if (companyChanges.data instanceof FormData) {
        return this.props.editCompanyInfo(companyChanges, true);
      }
      return this.props.editCompanyInfo(companyChanges);
    }
    return this.props.createCompanyInfo(companyInfoValues);
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const {
      error, success, formToRender: Form, ...restProps
    } = this.props;

    const CompanyFormToRender = Form || CompanyInfoForm;
    return (
      <CompanyFormToRender
        {...restProps}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
}

CompanyInfoFormContainer.propTypes = {
  formToRender: PropTypes.func,
  editCompanyInfo: PropTypes.func.isRequired,
  createCompanyInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.object,
  companyInfo: PropTypes.shape({
    id: PropTypes.number,
  }),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectCompanyInfoLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editCompanyInfo: (companyInfo, isFormData) =>
    dispatch(editCompanyInfo(companyInfo, isFormData)),
  createCompanyInfo: (companyInfo) => dispatch(createCompanyInfo(companyInfo)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'companyInfoForm', reducer });
const withSaga = injectSaga({ key: 'companyInfoForm', saga });
export default compose(withReducer, withSaga, withConnect)(CompanyInfoFormContainer);
