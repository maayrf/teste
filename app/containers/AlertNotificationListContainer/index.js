/**
 *
 * Alerts Emitted Page
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import {
  makeSelectError,
  makeSelectAlertNotifications,
  makeSelectAlertNotificationsLoading,
} from './selectors';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import AlertNotificationList from '../../components/AlertNotificationList';

class AlertNotificationListContainer extends Component {
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
  }
  render() {
    const { loading, alertNotifications } = this.props;
    return (
      <div className="alert-notification">
        <LoadingCard loading={loading} style={loading ? { padding: 16 } : {}}>
          <AlertNotificationList alertNotifications={alertNotifications} />
        </LoadingCard>
      </div>
    );
  }
}

AlertNotificationListContainer.propTypes = {
  error: PropTypes.object,
  alertNotifications: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  alertNotifications: makeSelectAlertNotifications(),
  loading: makeSelectAlertNotificationsLoading(),
});

const withConnect = connect(mapStateToProps);
export default compose(withConnect)(AlertNotificationListContainer);
