/* eslint-disable no-shadow */
/**
 *
 * Report Page
 *
 */
import React, { Component } from 'react';
import { Card, Row } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import reportReducer from './reducer';
import reportSaga from './saga';
import reportsReducer from '../ReportListContainer/reducer';
import reportsSaga from '../ReportListContainer/saga';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { makeSelectError, makeSelectReportLoading } from './selectors';
import { createReport } from './actions';

import ExportReportForm from '../../components/ExportReportForm';
import openNotificationWithIcon from '../../utils/antd-notification';
import './style.less';
import ReportListContainer from '../ReportListContainer';
import {
  makeSelectLimit,
  makeSelectOffset,
} from '../ReportListContainer/selectors';

class ReportPage extends Component {
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.message);
    }
  }
  handleExportReportFormSubmit = (exportReportFormData) => {
    const { createReport } = this.props;
    createReport(exportReportFormData).then(() => {
      openNotificationWithIcon('success', 'Criado com sucesso!');
    });
  };
  renderHead = () => (
    <Helmet>
      <title>Exportar Dados</title>
    </Helmet>
  );
  render() {
    const { renderHead } = this;
    const { loading } = this.props;
    return (
      <div>
        {renderHead()}
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          className="_margin-bottom"
        >
          <h1 className="_page-title">Exportar Dados</h1>
        </Row>
        <ExportReportForm
          loading={loading}
          onSubmit={this.handleExportReportFormSubmit}
        />
        <Card>
          <ReportListContainer />
        </Card>
      </div>
    );
  }
}

ReportPage.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  createReport: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectReportLoading(),
  limit: makeSelectLimit(),
  offset: makeSelectOffset(),
});

const mapDispatchToProps = (dispatch) => ({
  createReport: (report) =>
    new Promise((resolve, reject) =>
      dispatch(createReport(report, resolve, reject))),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReportReducer = injectReducer({
  key: 'report',
  reducer: reportReducer,
});
const withReportSaga = injectSaga({ key: 'report', saga: reportSaga });

const withReportsReducer = injectReducer({
  key: 'reports',
  reducer: reportsReducer,
});
const withReportsSaga = injectSaga({ key: 'reports', saga: reportsSaga });

export default compose(
  withReportReducer,
  withReportSaga,
  withReportsReducer,
  withReportsSaga,
  withConnect
)(ReportPage);
