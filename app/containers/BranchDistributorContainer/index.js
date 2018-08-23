/* eslint-disable no-shadow */
/**
 *
 * Branch Distributor Page
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectBranchDistributors,
  makeSelectBranchDistributorsLoading,
} from './selectors';
import { loadBranchDistributors, editBranchDistributor } from './actions';
import reducer from './reducer';
import saga from './saga';
import LoadingCard from '../../components/LoadingCard';
import BranchDistributorForm from '../../components/BranchDistributorForm';
import openNotificationWithIcon from '../../utils/antd-notification';
import { dispatchWithPromise } from '../../utils/dispatchWithPromise';

class BranchDistributorContainer extends Component {
  componentDidMount() {
    const { loadBranchDistributors, branchId } = this.props;
    if (branchId) {
      loadBranchDistributors(branchId);
    }
  }
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.message.toString());
    }
  }
  onSubmit = (dataDistributor) => {
    const { editBranchDistributor, branchId } = this.props;
    editBranchDistributor({ id: branchId, ...dataDistributor }).then(() => {
      openNotificationWithIcon('success', 'Distribuidora editada!');
    });
  };
  render() {
    const { branchDistributors, loading } = this.props;
    return (
      <div className="branch-distributor-page">
        <LoadingCard loading={loading}>
          <BranchDistributorForm
            onSubmit={this.onSubmit}
            loading={loading}
            branchDistributor={branchDistributors}
          />
        </LoadingCard>
      </div>
    );
  }
}

BranchDistributorContainer.propTypes = {
  error: PropTypes.object,
  branchDistributors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadBranchDistributors: PropTypes.func.isRequired,
  editBranchDistributor: PropTypes.func.isRequired,
  branchId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  branchDistributors: makeSelectBranchDistributors(),
  loading: makeSelectBranchDistributorsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadBranchDistributors: (branchId) =>
    dispatch(loadBranchDistributors(branchId)),
  editBranchDistributor: dispatchWithPromise(dispatch, editBranchDistributor),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'branchDistributors', reducer });
const withSaga = injectSaga({ key: 'branchDistributors', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(BranchDistributorContainer);
