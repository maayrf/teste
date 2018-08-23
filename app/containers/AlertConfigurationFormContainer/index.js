/**
 *
 * AlertConfiguration Form
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AlertConfigurationForm from '../../components/AlertConfigurationForm';

import {
  makeSelectError,
  makeSelectAlertConfigurationLoading,
  makeSelectSuccess,
} from './selectors';
import { createAlertConfiguration, editAlertConfiguration } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class AlertConfigurationFormContainer extends Component {
  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.toString());
      this.props.onError(error);
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
      this.props.onSuccess(success);
    }
  }
  handleFinish = (alertConfigurationValues) => {
    const { alertConfiguration } = this.props;
    if (alertConfiguration && alertConfiguration.id) {
      return this.props.editAlertConfiguration({
        ...alertConfigurationValues,
        id: alertConfiguration.id,
      });
    }
    return this.props.createAlertConfiguration(alertConfigurationValues);
  };
  render() {
    const { handleFinish } = this;
    const { error, success, ...restProps } = this.props;
    return <AlertConfigurationForm {...restProps} onFinish={handleFinish} />;
  }
}

AlertConfigurationFormContainer.propTypes = {
  editAlertConfiguration: PropTypes.func.isRequired,
  createAlertConfiguration: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.object,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  alertConfiguration: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    analysisInterval: PropTypes.string,
    analysisDay: PropTypes.number,
    meters: PropTypes.array,
    name: PropTypes.string,
    mailTo: PropTypes.array,
  }),
};
AlertConfigurationFormContainer.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectAlertConfigurationLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editAlertConfiguration: (alertConfiguration) =>
    dispatch(editAlertConfiguration(alertConfiguration)),
  createAlertConfiguration: (alertConfiguration) =>
    dispatch(createAlertConfiguration(alertConfiguration)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(AlertConfigurationFormContainer);
