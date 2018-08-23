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
import { loadMachineById } from './actions';
import LoadingCard from '../../components/LoadingCard/index';

export const withDetailMachine = (REDUCER_KEY) => (WrappedComponent) => {
  const withDetailMachineComponent = class extends React.Component {
    componentDidMount() {
      const { loadMachineById, machineId } = this.props;
      loadMachineById(machineId);
    }
    componentDidUpdate(prevProps) {
      const { error } = this.props;
      if (error && prevProps.error !== error) {
        openNotificationWithIcon('error', error.toString());
      }
    }
    render() {
      const {
        loading, success, error, machineId, ...restProps
      } = this.props;

      if (success) {
        restProps.machine = success.machine;
      }

      return (
        <LoadingCard loading={loading}>
          <WrappedComponent {...restProps} />
        </LoadingCard>
      );
    }
  };

  withDetailMachineComponent.propTypes = {
    machineId: PropTypes.number.isRequired,
    error: PropTypes.object,
    success: PropTypes.object,
    loading: PropTypes.bool,
  };

  const mapStateToProps = createStructuredSelector({
    error: makeSelectError(REDUCER_KEY),
    loading: makeSelectLoading(REDUCER_KEY),
    success: makeSelectSuccess(REDUCER_KEY),
  });

  const mapDispatchToProps = (dispatch) => ({
    loadMachineById: (machineId) => dispatch(loadMachineById(machineId)),
  });

  const withConnect = connect(mapStateToProps, mapDispatchToProps);

  return withConnect(withDetailMachineComponent);
};
