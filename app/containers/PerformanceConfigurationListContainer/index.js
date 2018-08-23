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

import {
  makeSelectError,
  makeSelectPerformanceConfigurations,
  makeSelectPerformanceConfigurationsLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadPerformanceConfigurations } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import PerformanceConfigurationList from '../../components/PerformanceConfigurationList';
import MyPerformanceIndexCreateButton from '../MyPerformanceIndexPage/components/MyPerformanceIndexCreateButton';

class PerformanceConfigurationListContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadPerformanceConfigurations(currentPage, limit);
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
    this.loadPerformanceConfigurations(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadPerformanceConfigurations = (page, limit) => {
    const offset = this.getOffset(page, limit);
    this.props.loadPerformanceConfigurations({
      paginationStart: offset,
      paginationNumber: limit,
    });
  };
  actionColumns = () => (
    <Row type="flex" justify="end" align="middle" gutter={15}>
      <Col>
        <Button icon="edit">Editar</Button>
      </Col>
      <Col>
        <Button type="danger" icon="delete">
          Deletar
        </Button>
      </Col>
    </Row>
  );
  render() {
    const {
      loading,
      performanceConfigurations,
      totalCount,
      limit,
    } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="performance-configuration">
        <Row type="flex" justify="end" className="_margin-bottom">
          <MyPerformanceIndexCreateButton />
        </Row>
        <LoadingCard loading={loading}>
          <PerformanceConfigurationList
            performanceConfigurations={performanceConfigurations}
            actionColumn={this.actionColumns}
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

PerformanceConfigurationListContainer.propTypes = {
  error: PropTypes.object,
  performanceConfigurations: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadPerformanceConfigurations: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  performanceConfigurations: makeSelectPerformanceConfigurations(),
  loading: makeSelectPerformanceConfigurationsLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadPerformanceConfigurations: (params) =>
    dispatch(loadPerformanceConfigurations(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(PerformanceConfigurationListContainer);
