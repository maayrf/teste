/**
 *
 * Branches Select Container
 *
 */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import BranchesSelect from '../../components/BranchesSelect';
import './style.less';
import {
  makeSelectBranches,
  makeSelectBranchesLoading,
  makeSelectError,
} from '../BranchListContainer/selectors';
import branchesReducer from '../BranchListContainer/reducer';
import branchesSaga from '../BranchListContainer/saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { loadBranches } from '../BranchListContainer/actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class BranchesSelectContainer extends Component {
  componentDidMount() {
    const {
      filter: { companyId },
      disable,
    } = this.props;
    if (!disable && companyId) {
      this.props.loadBranches({ searchCompanyId: companyId });
    }
    this.props.loadBranches();
  }
  componentDidUpdate(prevProps) {
    const {
      error,
      filter: { companyId },
    } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.messageTitle, error.message);
    }
    if (prevProps.filter.companyId !== companyId && companyId) {
      this.props.loadBranches({ searchCompanyId: companyId });
    }
  }
  handleSelect = (branchId) => {
    this.props.onChangeBranch(branchId);
  };
  render() {
    return <BranchesSelect {...this.props} onChange={this.handleSelect} />;
  }
}

BranchesSelectContainer.propTypes = {
  filter: PropTypes.object,
  disable: PropTypes.bool,
  loadBranches: PropTypes.func.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  branches: PropTypes.array.isRequired,
  onChangeBranch: PropTypes.func.isRequired,
};

const storeKey = 'branchesSelect';

const mapStateToProps = createStructuredSelector({
  branches: makeSelectBranches(storeKey),
  loading: makeSelectBranchesLoading(storeKey),
  error: makeSelectError(storeKey),
});

const mapDispatchToProps = (dispatch) => ({
  loadBranches: () => dispatch(loadBranches()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withBranchesSelectReducer = injectReducer({
  key: storeKey,
  reducer: branchesReducer,
});
const withBranchesSelectSaga = injectSaga({
  key: storeKey,
  saga: branchesSaga,
});

export default compose(
  withBranchesSelectReducer,
  withBranchesSelectSaga,
  withConnect
)(BranchesSelectContainer);
