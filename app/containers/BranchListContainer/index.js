/**
 *
 * Branch List Container
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Pagination, Row } from 'antd';
import { isEqual } from 'lodash';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectBranches,
  makeSelectBranchesLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadBranches } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import BranchList from '../../components/BranchList';

class BranchListContainer extends Component {
  static defaultProps = {
    filter: {},
    valuePropName: 'branches',
  };
  state = {
    currentPage: 1,
  };
  componentDidMount() {
    const { currentPage } = this.state;
    const { filter, limit } = this.props;
    this.loadBranches(currentPage, limit, filter);
  }
  componentDidUpdate(prevProps) {
    const { error, filter, limit } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (!isEqual(filter, prevProps.filter)) {
      const { currentPage } = this.state;
      this.loadBranches(currentPage, limit, filter);
    }
  }
  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.props;
    this.loadBranches(currentPage, limit);
  };
  getOffset = (page, limit) => (page - 1) * limit;
  loadBranches = (page, limit, filter = {}) => {
    const offset = this.getOffset(page, limit);
    if (limit) {
      this.props.loadBranches({
        offset,
        limit,
        ...filter,
      });
    } else {
      this.props.loadBranches(filter);
    }
  };
  render() {
    const {
      loading,
      branches,
      totalCount,
      limit,
      component,
      valuePropName,
    } = this.props;
    const { currentPage } = this.state;
    const WrappedComponent = component || BranchList;
    const props = {
      ...this.props,
      [valuePropName]: branches,
    };
    return (
      <div className="branch">
        <LoadingCard loading={loading}>
          <WrappedComponent {...props} branches={branches} />
        </LoadingCard>
        {limit && (
          <Row type="flex" justify="end">
            <Pagination
              onChange={this.onChangePage}
              pageSize={limit}
              current={currentPage}
              total={totalCount}
            />
          </Row>
        )}
      </div>
    );
  }
}

BranchListContainer.propTypes = {
  valuePropName: PropTypes.string,
  component: PropTypes.any,
  filter: PropTypes.object,
  error: PropTypes.object,
  branches: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadBranches: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  branches: makeSelectBranches(),
  loading: makeSelectBranchesLoading(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadBranches: (params) => dispatch(loadBranches(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'branches', reducer });
const withSaga = injectSaga({ key: 'branches', saga });
export default compose(withReducer, withSaga, withConnect)(BranchListContainer);
