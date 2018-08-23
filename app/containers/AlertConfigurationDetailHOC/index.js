import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Card } from 'antd';

import openNotificationWithIcon from '../../utils/antd-notification';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
} from './selectors';
import { loadAlertConfigurationById } from './actions';

export const withAlertConfiguration = (WrappedComponent) => {
  const withAlertConfigurationComponent = class extends React.Component {
    componentDidMount() {
      const { loadAlertConfigurationById, alertConfigurationId } = this.props;
      loadAlertConfigurationById(alertConfigurationId);
    }
    componentDidUpdate(prevProps) {
      const { error, success } = this.props;
      if (error && prevProps.error !== error) {
        openNotificationWithIcon('error', error.toString());
      }
    }
    render() {
      const {
        loading,
        success,
        error,
        alertConfigurationId,
        ...restProps
      } = this.props;

      if (success) {
        restProps.alertConfiguration = success.alertConfiguration;
      }

      return (
        <Card
          loading={loading}
          className="card-no-padding card-no-border card-no-background"
        >
          <WrappedComponent {...restProps} />
        </Card>
      );
    }
  };

  withAlertConfigurationComponent.propTypes = {
    alertConfigurationId: PropTypes.number.isRequired,
    error: PropTypes.object,
    success: PropTypes.object,
    loading: PropTypes.bool,
  };

  const mapStateToProps = createStructuredSelector({
    error: makeSelectError(),
    loading: makeSelectLoading(),
    success: makeSelectSuccess(),
  });

  const mapDispatchToProps = (dispatch) => ({
    loadAlertConfigurationById: (alertConfigurationId) =>
      dispatch(loadAlertConfigurationById(alertConfigurationId)),
  });

  const withConnect = connect(mapStateToProps, mapDispatchToProps);

  return withConnect(withAlertConfigurationComponent);
};
