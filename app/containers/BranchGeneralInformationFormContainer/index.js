/**
 *
 * BranchGeneralInformation Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import BranchGeneralInformationForm from '../../components/BranchGeneralInformationForm';

import { makeSelectBranchGeneralInformationLoading } from './selectors';
import {
  createBranchGeneralInformation,
  editBranchGeneralInformation,
} from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import branchGeneralInformationFormSaga from './saga';
import branchGeneralInformationFormReducer from './reducer';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { dispatchWithPromise } from '../../utils/dispatchWithPromise';
import { loadBranches } from '../BranchListContainer/actions';

class BranchGeneralInformationFormContainer extends Component {
  handleCancel = () => {
    this.props.onCancel();
  };
  hasSuccess = (branch) => {
    const typeAction = this.props.branch ? 'editado' : 'criado';
    openNotificationWithIcon(
      'success',
      `Unidade ${branch.tradename} ${typeAction} com sucesso!`
    );
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
    this.props.loadBranches();
  };
  hasError = (error) => {
    openNotificationWithIcon('error', error.messageTitle, error.message);
  };
  handleSubmit = (branchGeneralInformationValues) => {
    const { branch } = this.props;
    if (branch && branch.id) {
      return this.props
        .editBranchGeneralInformation(branchGeneralInformationValues)
        .then(this.hasSuccess)
        .catch(this.hasError);
    }
    return this.props
      .createBranchGeneralInformation(branchGeneralInformationValues)
      .then(this.hasSuccess)
      .catch(this.hasError);
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const { error, success, ...restProps } = this.props;
    return (
      <BranchGeneralInformationForm
        {...restProps}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
}

BranchGeneralInformationFormContainer.propTypes = {
  editBranchGeneralInformation: PropTypes.func.isRequired,
  createBranchGeneralInformation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.object,
  branch: PropTypes.shape({
    id: PropTypes.number,
    tradename: PropTypes.string,
    cnpj: PropTypes.string,
    cnae: PropTypes.string,
    employees: PropTypes.number,
    postcode: PropTypes.string,
    streetName: PropTypes.string,
    streetNumber: PropTypes.string,
    district: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    department: PropTypes.string,
    subDepartment: PropTypes.string,
  }),
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  loadBranches: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectBranchGeneralInformationLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  editBranchGeneralInformation: dispatchWithPromise(
    dispatch,
    editBranchGeneralInformation
  ),
  createBranchGeneralInformation: dispatchWithPromise(
    dispatch,
    createBranchGeneralInformation
  ),
  loadBranches: () => dispatch(loadBranches()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withBranchGeneralInformationFormSaga = injectSaga({
  key: 'branchGeneralInformationForm',
  saga: branchGeneralInformationFormSaga,
});
const withBranchGeneralInformationFormReducer = injectReducer({
  key: 'branchGeneralInformationForm',
  reducer: branchGeneralInformationFormReducer,
});
export default compose(
  withBranchGeneralInformationFormSaga,
  withBranchGeneralInformationFormReducer,
  withConnect
)(BranchGeneralInformationFormContainer);
