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
  makeSelectKpiReportDates,
  makeSelectKpiReportDatesLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { makeSelectSuccess } from '../FillKpiReportFormContainer/selectors';
import { loadKpiReportDates } from './actions';
import reducer from './reducer';
import saga from './saga';
import fillKpiReportReducer from '../FillKpiReportFormContainer/reducer';
import fillKpiReportSaga from '../FillKpiReportFormContainer/saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import KpiReportDateList from '../../components/KpiReportList';

class KpiReportDateListContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadKpiReportDates(currentPage, limit);
  }
  componentDidUpdate(prevProps) {
    const { error, filter, fillKpiReportSuccess } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }

    if (
      fillKpiReportSuccess &&
      prevProps.fillKpiReportSuccess !== fillKpiReportSuccess
    ) {
      openNotificationWithIcon('success', fillKpiReportSuccess.message);
    }

    if (prevProps.filter !== filter) {
      const { limit, currentPage } = this.state;
      this.loadKpiReportDates(currentPage, limit, filter);
    }
  }
  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.state;
    this.loadKpiReportDates(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadKpiReportDates = (page, limit, filter) => {
    const offset = this.getOffset(page, limit);
    this.props.loadKpiReportDates({
      paginationStart: offset,
      paginationNumber: limit,
      ...filter,
    });
  };
  render() {
    const {
      loading, kpiReportDates, totalCount, limit,
    } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="kpi-report-date">
        <LoadingCard loading={loading}>
          <KpiReportDateList kpiReportDates={kpiReportDates} />
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

KpiReportDateListContainer.propTypes = {
  error: PropTypes.object,
  filter: PropTypes.object,
  kpiReportDates: PropTypes.array.isRequired,
  fillKpiReportSuccess: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  loadKpiReportDates: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  kpiReportDates: makeSelectKpiReportDates(),
  loading: makeSelectKpiReportDatesLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
  fillKpiReportSuccess: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  loadKpiReportDates: (params) => dispatch(loadKpiReportDates(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'kpiReportDates', reducer });
const withSaga = injectSaga({ key: 'kpiReportDates', saga });
const withFillKpiReducer = injectReducer({
  key: 'fillKpiReportForm',
  reducer: fillKpiReportReducer,
});
const withfillKpiSaga = injectSaga({
  key: 'fillKpiReportForm',
  saga: fillKpiReportSaga,
});

export default compose(
  withReducer,
  withSaga,
  withFillKpiReducer,
  withfillKpiSaga,
  withConnect
)(KpiReportDateListContainer);
