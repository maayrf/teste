/**
 *
 * My Performance Index Page
 *
 */
import React, { Component } from 'react';
import { Card, Row } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import myPerformanceIndexReducer from './reducer';
import myPerformanceIndexSaga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectMyPerformanceIndexsLoading,
} from './selectors';

import MyPerformanceIndexTabs from './components/MyPerformanceIndexTabs';
import openNotificationWithIcon from '../../utils/antd-notification';
import performanceConfigurationReducer from '../PerformanceConfigurationListContainer/reducer';
import performanceConfigurationsSaga from '../PerformanceConfigurationListContainer/saga';

import LoadingCard from '../../components/LoadingCard/index';

class MyPerformanceIndexPage extends Component {
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.message);
    }
  }
  renderHead = () => (
    <Helmet>
      <title>Índices de performance</title>
    </Helmet>
  );
  render() {
    const { renderHead } = this;
    const { loading } = this.props;
    return (
      <div>
        {renderHead()}
        <Row type="flex" align="middle" className="_margin-bottom">
          <h1 className="_page-title">Índices de performance</h1>
        </Row>
        <Card>
          <LoadingCard loading={loading}>
            <MyPerformanceIndexTabs />
          </LoadingCard>
        </Card>
      </div>
    );
  }
}

MyPerformanceIndexPage.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectMyPerformanceIndexsLoading(),
});

const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withMyPerformanceIndexReducer = injectReducer({
  key: 'myPerformanceIndex',
  reducer: myPerformanceIndexReducer,
});
const withMyPerformanceIndexSaga = injectSaga({
  key: 'myPerformanceIndex',
  saga: myPerformanceIndexSaga,
});

const withPerformanceConfigurationsReducer = injectReducer({
  key: 'performanceConfigurations',
  reducer: performanceConfigurationReducer,
});
const withPerformanceConfigurationsSaga = injectSaga({
  key: 'performanceConfigurations',
  saga: performanceConfigurationsSaga,
});

export default compose(
  withMyPerformanceIndexReducer,
  withMyPerformanceIndexSaga,
  withConnect,
  withPerformanceConfigurationsReducer,
  withPerformanceConfigurationsSaga
)(MyPerformanceIndexPage);
