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
import { Pagination, Row } from 'antd';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectAlertsEmitted,
  makeSelectAlertsEmittedLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadAlertsEmitted, changeAlertsEmittedStatus } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import AlertsEmittedList from '../../components/AlertsEmittedList/index';
import AlertEmittedStatusMenu from '../../components/AlertsEmittedList/components/AlertEmittedStatusMenu/index';
import {
  resolveAlertKey,
  unsolveAlertKey,
} from '../../components/AlertsEmittedList/constants';
import { allRadioButtonValue } from '../../components/AlertsEmittedList/components/AlertEmittedFilterForm/constants';

class AlertsEmittedListContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
    selectedRows: [],
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    const filter = {
      searchStatus: allRadioButtonValue,
    };
    this.loadAlertsEmitted(currentPage, limit, filter);
  }
  componentDidUpdate(prevProps) {
    const { error, filter } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (prevProps.filter !== filter) {
      const { limit, currentPage } = this.state;
      this.loadAlertsEmitted(currentPage, limit, filter);
    }
  }
  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.state;
    this.loadAlertsEmitted(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadAlertsEmitted = (currentPage, limit, filter = {}) => {
    const offset = this.getOffset(currentPage, limit);
    this.props.loadAlertsEmitted({
      offset,
      limit,
      ...filter,
    });
  };
  handleSelectedRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  };
  formatAlertsStatus = (alerts, boolean) =>
    alerts.map((alert) => ({
      id: alert.id,
      resolved: boolean,
    }));

  hasSelectedRows = (rows) => {
    if (rows && rows.length > 0) return true;
    return false;
  };

  changeStatusSuccess = () => {
    const { limit, currentPage } = this.state;
    const { filter } = this.props;

    this.loadAlertsEmitted(currentPage, limit, filter);
    this.handleSelectedRows([]);
    openNotificationWithIcon('success', 'Marcação feita com sucesso!');
  };

  changeAlertEmittedStatus = (boolean) => {
    const { selectedRows } = this.state;
    const { changeAlertsEmittedStatus } = this.props;

    if (!this.hasSelectedRows(selectedRows)) return;
    changeAlertsEmittedStatus(
      this.formatAlertsStatus(selectedRows, boolean),
      this.changeStatusSuccess
    );
  };

  resolveAlerts = () => {
    this.changeAlertEmittedStatus(true);
  };

  unsolveAlerts = () => {
    this.changeAlertEmittedStatus(false);
  };

  handleMenuClick = ({ key }) => {
    const { resolveAlerts, unsolveAlerts } = this;
    switch (key) {
      case String(resolveAlertKey):
        return resolveAlerts();
      case String(unsolveAlertKey):
        return unsolveAlerts();
      default:
        return null;
    }
  };
  render() {
    const {
      loading, alertsEmitted, totalCount, limit,
    } = this.props;
    const { currentPage, selectedRows } = this.state;
    return (
      <div className="alerts-emitted-list">
        <LoadingCard loading={loading}>
          <AlertEmittedStatusMenu
            selectedRows={selectedRows}
            resolveAlerts={this.resolveAlerts}
            unsolveAlerts={this.unsolveAlerts}
            handleMenuClick={this.handleMenuClick}
          />
          <AlertsEmittedList
            alertsEmitted={alertsEmitted}
            handleSelectedRows={this.handleSelectedRows}
          />
        </LoadingCard>
        <Row type="flex" justify="end">
          <Pagination
            onChange={this.onChangePage}
            pageSize={limit}
            current={currentPage}
            total={totalCount}
          />
        </Row>
      </div>
    );
  }
}

AlertsEmittedListContainer.propTypes = {
  error: PropTypes.object,
  filter: PropTypes.object,
  alertsEmitted: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadAlertsEmitted: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  actionColumn: PropTypes.func,
  changeAlertsEmittedStatus: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  alertsEmitted: makeSelectAlertsEmitted(),
  loading: makeSelectAlertsEmittedLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = {
  loadAlertsEmitted,
  changeAlertsEmittedStatus,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'alertsEmitted', reducer });
const withSaga = injectSaga({ key: 'alertsEmitted', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(AlertsEmittedListContainer);
