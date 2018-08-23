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
import { isEqual } from 'lodash';
import { Pagination, Row } from 'antd';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectMeters,
  makeSelectMetersLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadMeters } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import MeterList from '../../components/MeterList';

class MeterListContainer extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };
  static defaultProps = {
    filter: {},
  };
  componentDidMount() {
    const { limit, currentPage } = this.state;
    const { filter } = this.props;
    this.loadMeters(currentPage, limit, filter); // TODO: Add filter param
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (!isEqual(this.props.filter, prevProps.filter)) {
      const { limit, currentPage } = this.state;
      const { filter } = this.props;
      this.loadMeters(currentPage, limit, filter);
    }
  }
  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit, filter } = this.state;
    this.loadMeters(currentPage, limit, filter); // TODO: Add filter param
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadMeters = (page, limit, filter) => {
    const offset = this.getOffset(page, limit);
    this.props.loadMeters({
      paginationStart: offset,
      paginationNumber: limit,
      ...filter,
    });
  };
  handleSubmit = (values) => {
    const { limit, currentPage } = this.state;
    this.setState(
      {
        filter: values,
      },
      () => {
        this.loadMeters(currentPage, limit, values);
      }
    );
  };
  render() {
    const {
      loading, meters, totalCount, limit,
    } = this.props;
    const { currentPage } = this.state;
    return (
      <div className="meter">
        <LoadingCard loading={loading}>
          <MeterList meters={meters} />
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

MeterListContainer.propTypes = {
  filter: PropTypes.object,
  error: PropTypes.object,
  meters: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMeters: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  meters: makeSelectMeters(),
  loading: makeSelectMetersLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadMeters: (params) => dispatch(loadMeters(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'meters', reducer });
const withSaga = injectSaga({ key: 'meters', saga });
export default compose(withReducer, withSaga, withConnect)(MeterListContainer);
