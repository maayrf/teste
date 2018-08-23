/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * Alert Notification Container
 *
 */
import React, { Component } from 'react';
import { Badge, Icon, Popover } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import AlertNotificationListContainer from '../../containers/AlertNotificationListContainer';
import {
  makeSelectAlertNotifications,
  makeSelectError,
} from '../AlertNotificationListContainer/selectors';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from '../AlertNotificationListContainer/reducer';
import saga from '../AlertNotificationListContainer/saga';
import { loadAlertNotifications } from '../AlertNotificationListContainer/actions';
import './style.less';
import { withLoginUser } from '../../utils/withLoginUser';

class AlertNotificationContainer extends Component {
  componentDidMount() {
    const {
      user: { token },
    } = this.props;
    this.props.loadAlertNotifications({ token });
  }
  contentPopover = () => (
    <div className="content-popover">
      <div className="content-alerts">
        <AlertNotificationListContainer />
      </div>
      <div className="see-all-alerts">
        <Link to="/alertas/alertas-emitidos">Visualizar todos os alertas</Link>
      </div>
    </div>
  );
  render() {
    const { alertNotifications } = this.props;
    return (
      <div className="alert-notification-container">
        <Popover
          placement="bottom"
          content={this.contentPopover()}
          title="Alertas Pendentes"
        >
          <Badge
            count={alertNotifications.length}
            className="badge-notification"
          >
            <Icon type="bell" />
          </Badge>
        </Popover>
      </div>
    );
  }
}

AlertNotificationContainer.propTypes = {
  alertNotifications: PropTypes.array.isRequired,
  loadAlertNotifications: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  alertNotifications: makeSelectAlertNotifications(),
  error: makeSelectError(),
});

const mapDispatchToProps = (dispatch) => ({
  loadAlertNotifications: (params) => dispatch(loadAlertNotifications(params)),
});

const withReducer = injectReducer({ key: 'alertNotifications', reducer });
const withSaga = injectSaga({ key: 'alertNotifications', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withReducer, withSaga, withConnect, withLoginUser)(AlertNotificationContainer);
