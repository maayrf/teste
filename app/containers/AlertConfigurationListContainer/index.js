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
  makeSelectAlertConfigurations,
  makeSelectAlertConfigurationsLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadAlertConfigurations } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import AlertConfigurationList from '../../components/AlertConfigurationList';

class AlertConfigurationListContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    const { filter } = this.props;
    this.loadAlertConfigurations(currentPage, limit, filter);
  }
  componentDidUpdate(prevProps) {
    const { error, filter } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (prevProps.filter !== filter) {
      const { limit, currentPage } = this.state;
      this.loadAlertConfigurations(currentPage, limit, filter);
    }
  }
  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.state;
    this.loadAlertConfigurations(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadAlertConfigurations = (page, limit, filter) => {
    const offset = this.getOffset(page, limit);
    this.props.loadAlertConfigurations({
      offset,
      limit,
      ...filter,
    });
  };
  render() {
    const {
      loading,
      alertConfigurations,
      totalCount,
      limit,
      actionColumn,
    } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="alert-configuration">
        <LoadingCard loading={loading}>
          <AlertConfigurationList
            actionColumn={actionColumn}
            alertConfigurations={alertConfigurations}
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

AlertConfigurationListContainer.propTypes = {
  error: PropTypes.object,
  filter: PropTypes.object,
  alertConfigurations: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadAlertConfigurations: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  actionColumn: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  alertConfigurations: makeSelectAlertConfigurations(),
  loading: makeSelectAlertConfigurationsLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadAlertConfigurations: (params) =>
    dispatch(loadAlertConfigurations(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'alertConfigurations', reducer });
const withSaga = injectSaga({ key: 'alertConfigurations', saga });
export default compose(withReducer, withSaga, withConnect)(AlertConfigurationListContainer);
