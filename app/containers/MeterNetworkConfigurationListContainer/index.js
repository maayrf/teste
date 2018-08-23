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
import { Button, Col, Pagination, Row } from 'antd';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectMeterNetworkConfigurations,
  makeSelectMeterNetworkConfigurationsLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadMeterNetworkConfigurations } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import MeterNetworkConfigurationList from '../../components/MeterNetworkConfigurationList';

class MeterNetworkConfigurationListContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadMeterNetworkConfigurations(currentPage, limit);
  }
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
  }
  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.state;
    this.loadMeterNetworkConfigurations(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadMeterNetworkConfigurations = (page, limit) => {
    const offset = this.getOffset(page, limit);
    this.props.loadMeterNetworkConfigurations(
      {
        paginationStart: offset,
        paginationNumber: limit,
      },
      this.props.meterId
    );
  };
  actionColums = () => (
    <Row type="flex" justify="end">
      <Col>
        <Button icon="edit" size="small">
          Editar
        </Button>
      </Col>
    </Row>
  );
  render() {
    const {
      loading,
      meterNetworkConfigurations,
      totalCount,
      limit,
    } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="meter-network-configuration-list">
        <LoadingCard loading={loading}>
          <MeterNetworkConfigurationList
            meterNetworkConfigurations={meterNetworkConfigurations}
            actionColumn={this.actionColums}
          />
        </LoadingCard>
        <Row type="flex" justify="end">
          <Pagination
            onChange={this.onChangeRangeDate}
            pageSize={limit}
            current={currentPage}
            total={totalCount}
          />
        </Row>
      </div>
    );
  }
}

MeterNetworkConfigurationListContainer.propTypes = {
  error: PropTypes.object,
  meterNetworkConfigurations: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMeterNetworkConfigurations: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  meterId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  meterNetworkConfigurations: makeSelectMeterNetworkConfigurations(),
  loading: makeSelectMeterNetworkConfigurationsLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadMeterNetworkConfigurations: (params, meterId) =>
    dispatch(loadMeterNetworkConfigurations(params, meterId)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({
  key: 'meterNetworkConfigurations',
  reducer,
});
const withSaga = injectSaga({ key: 'meterNetworkConfigurations', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(MeterNetworkConfigurationListContainer);
