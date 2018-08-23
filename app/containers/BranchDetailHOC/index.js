import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import openNotificationWithIcon from '../../utils/antd-notification';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
} from './selectors';
import { loadBranchById } from './actions';
import LoadingCard from '../../components/LoadingCard/index';

export const withBranch = (reducerKey) => (WrappedComponent) => {
  const withBranchComponent = class extends React.Component {
    componentDidMount() {
      const { loadBranchById, branchId, filter } = this.props;
      loadBranchById(branchId, filter);
    }
    componentDidUpdate(prevProps) {
      const { error, success } = this.props;
      if (error && prevProps.error !== error) {
        openNotificationWithIcon('error', error.toString());
      }
    }
    render() {
      const {
        success, error, branchId, ...restProps
      } = this.props;

      let { loading } = this.props;

      if (success) {
        restProps.branch = success.branch;
      } else {
        loading = true;
      }
      return (
        <LoadingCard
          loading={loading}
          className="card-no-padding card-no-border card-no-background"
        >
          <WrappedComponent {...restProps} />
        </LoadingCard>
      );
    }
  };

  withBranchComponent.propTypes = {
    filter: PropTypes.object,
    branchId: PropTypes.number.isRequired,
    error: PropTypes.object,
    success: PropTypes.object,
    loading: PropTypes.bool,
  };

  const mapStateToProps = createStructuredSelector({
    error: makeSelectError(reducerKey),
    loading: makeSelectLoading(reducerKey),
    success: makeSelectSuccess(reducerKey),
  });

  const mapDispatchToProps = (dispatch) => ({
    loadBranchById: (branchId, params) =>
      dispatch(loadBranchById(branchId, params)),
  });

  const withConnect = connect(mapStateToProps, mapDispatchToProps);

  return withConnect(withBranchComponent);
};
