/**
 *
 * General Information Container
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import saga from '../BranchDetailsPage/saga';
import { editBranchDetails } from '../BranchDetailsPage/actions';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectBranchDetails,
  makeSelectBranchDetailsLoading,
} from '../BranchDetailsPage/selectors';
import GeneralInformationForm from '../../components/GeneralInformationForm/index';
import openNotificationWithIcon from '../../utils/antd-notification';
import { withLoginUser } from '../../utils/withLoginUser';

class GeneralInformationContainer extends Component {
  onSubmit = (dataForm) => {
    const { id } = this.props.branchDetails;
    this.props
      .editBranchDetails({ ...dataForm, id })
      .then(() =>
        openNotificationWithIcon('success', 'Informações editadas com sucesso!'));
  };

  render() {
    const { loading, branchDetails } = this.props;
    return (
      <div>
        <GeneralInformationForm
          currentUser={this.props.user}
          loading={loading}
          branchDetails={branchDetails}
          onSubmit={this.onSubmit}
          edit
        />
      </div>
    );
  }
}

GeneralInformationContainer.propTypes = {
  branchDetails: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  editBranchDetails: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  branchDetails: makeSelectBranchDetails(),
  loading: makeSelectBranchDetailsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  editBranchDetails: (dataForm) =>
    new Promise((resolve, reject) =>
      dispatch(editBranchDetails(dataForm, resolve, reject))),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'generalInformationOfBranchs', saga });

export default compose(withLoginUser, withSaga, withConnect)(GeneralInformationContainer);
