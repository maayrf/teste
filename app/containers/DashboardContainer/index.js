/**
 *
 * Dashboard Container
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import moment from 'moment';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectDashboard,
  makeSelectDashboardLoading,
  makeSelectSocketOn,
} from './selectors';
import {
  disconnectDashboardRealTime,
  loadDashboard,
  loadDashboardRealTime,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import Dashboard from '../../components/Dashboard';
import { withLoginUser } from '../../utils/withLoginUser';

class DashboardContainer extends Component {
  componentDidMount() {
    this.loadDashboardIfIsReady();
  }
  componentDidUpdate(prevProps) {
    const {
      error, month, year, branchId,
    } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }

    if (
      (month && prevProps.month !== month) ||
      (year && prevProps.year !== year) ||
      (branchId && prevProps.branchId !== branchId)
    ) {
      this.loadDashboardIfIsReady();
    }
  }
  loadDashboardIfIsReady = () => {
    if (this.props.month && this.props.year && this.props.branchId) {
      this.loadDashboard(
        this.props.month,
        this.props.year,
        this.props.branchId
      );
    }
  };
  isCurrentMonth = (month, year) => {
    const currentMonth = moment().month() + 1;
    const currentYear = moment().year();
    return currentMonth === month && currentYear === year;
  };
  loadDashboard = (month, year, branchId) => {
    const {
      user: { token },
    } = this.props;
    this.props.loadDashboard({
      month,
      year,
      branchId,
    });
    if (this.isCurrentMonth(month, year)) {
      this.props.loadDashboardRealTime({
        token,
        searchBranchId: branchId,
        month,
        year,
      });
    } else if (this.props.socketOn) {
      this.props.disconnectDashboardRealTime();
    }
  };
  render() {
    const { loading, dashboard, ...props } = this.props;

    return (
      <div className="dashboard">
        <LoadingCard loading={loading}>
          <Dashboard {...props} dashboard={dashboard} />
        </LoadingCard>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  error: PropTypes.object,
  dashboard: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadDashboard: PropTypes.func.isRequired,
  disconnectDashboardRealTime: PropTypes.func.isRequired,
  month: PropTypes.number,
  year: PropTypes.number,
  socketOn: PropTypes.bool,
  branchId: PropTypes.number,
  loadDashboardRealTime: PropTypes.func,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  dashboard: makeSelectDashboard(),
  loading: makeSelectDashboardLoading(),
  socketOn: makeSelectSocketOn(),
});

const mapDispatchToProps = (dispatch) => ({
  loadDashboard: (params) => dispatch(loadDashboard(params)),
  loadDashboardRealTime: (params) => dispatch(loadDashboardRealTime(params)),
  disconnectDashboardRealTime: () => dispatch(disconnectDashboardRealTime()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });
export default compose(withReducer, withSaga, withConnect, withLoginUser)(DashboardContainer);
