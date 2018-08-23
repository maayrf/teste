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
import { Col, Pagination, Row } from 'antd';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectReports,
  makeSelectReportsLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadReports } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import ReportList from '../../components/ReportList';
import ReportRemoveButton from '../ReportPage/components/ReportRemoveButton';
import ReportDownloadButton from '../ReportPage/components/ReportDownloadButton';

class ReportListContainer extends Component {
  state = {
    limit: 12,
    currentPage: 1,
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadReports(currentPage, limit);
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
    this.loadReports(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadReports = (page, limit) => {
    const offset = this.getOffset(page, limit);
    this.props.loadReports({
      paginationStart: offset,
      paginationNumber: limit,
    });
  };
  actionColumn = (text, report) => (
    <Row type="flex" justify="end" gutter={15}>
      <Col>
        <ReportRemoveButton report={report} loadReports={this.loadReports} />
      </Col>
      <Col>
        <ReportDownloadButton report={report} />
      </Col>
    </Row>
  );
  render() {
    const {
      loading, reports, totalCount, limit,
    } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="report-list">
        <LoadingCard loading={loading}>
          <ReportList reports={reports} actionColumn={this.actionColumn} />
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

ReportListContainer.propTypes = {
  error: PropTypes.object,
  reports: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadReports: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  reports: makeSelectReports(),
  loading: makeSelectReportsLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadReports: (params) => dispatch(loadReports(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'listReports', reducer });
const withSaga = injectSaga({ key: 'listReports', saga });
export default compose(withReducer, withSaga, withConnect)(ReportListContainer);
