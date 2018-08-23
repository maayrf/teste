/**
 *
 * Demand Exceed Fare Time Line By Branch Page
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Row, Pagination } from 'antd';
import RemoveDemandExceedFareButton from '../../containers/RemoveDemandExceedFareButton';
import './style.less';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectDemandExceedFaresError,
  makeSelectDemandExceedFares,
  makeSelectDemandExceedFaresLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadDemandExceedFaresByBranchId } from './actions';
import reducer from './reducer';
import saga from './saga';
import LoadingCard from '../../components/LoadingCard/index';
import EditDemandExceedFareButton from '../EditDemandExceedFareButton/index';
import { FARE_NOT_FOUND } from '../../utils/constants';
import FareTimeLineList from '../../components/FareTimeLineList/index';
import AddDemandExceedFareButton from '../AddDemandExceedFareButton/index';
import openNotificationWithIcon from '../../utils/antd-notification';

class DemandExceedFareTimeLineByBranch extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };

  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadDemandExceedFares(currentPage, limit);
  }

  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error);
    }
  }

  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.state;
    this.loadDemandExceedFares(currentPage, limit);
  };

  getOffset = (page, limit) => (page - 1) * limit;

  loadDemandExceedFares = (page, limit) => {
    const { branchId, loadDemandExceedFaresByBranchId } = this.props;
    const offset = this.getOffset(page, limit);
    loadDemandExceedFaresByBranchId(branchId, {
      paginationStart: offset,
      paginationNumber: limit,
    });
  };

  render() {
    const {
      loading,
      demandExceedFares,
      totalCount,
      limit,
      branchId,
    } = this.props;

    const { currentPage } = this.state;

    return (
      <div className="demand-exceed-fare-time-line-by-branch">
        <Row type="flex" justify="space-between" align="middle">
          <h2>Todas as Tarifas de Ultrapassagem de Demanda</h2>
        </Row>
        <LoadingCard loading={loading}>
          <FareTimeLineList
            itemLayout="horizontal"
            notFoundMessage="Não há tarifa de ultrapassagem de demanda cadastrada para este período"
            size="large"
            fares={demandExceedFares}
            actionColumn={(demandExceedFare) => {
              const { errorType } = demandExceedFare;
              if (errorType === FARE_NOT_FOUND) {
                return (
                  <AddDemandExceedFareButton
                    demandExceedFare={{
                      branch: { id: branchId },
                      ...demandExceedFare,
                    }}
                  />
                );
              }
              return (
                <Row type="flex" gutter={8}>
                  <EditDemandExceedFareButton
                    demandExceedFare={demandExceedFare}
                  />
                  <RemoveDemandExceedFareButton fare={demandExceedFare} />
                </Row>
              );
            }}
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

DemandExceedFareTimeLineByBranch.propTypes = {
  error: PropTypes.object,
  branchId: PropTypes.number.isRequired,
  demandExceedFares: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadDemandExceedFaresByBranchId: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectDemandExceedFaresError(),
  demandExceedFares: makeSelectDemandExceedFares(),
  loading: makeSelectDemandExceedFaresLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = {
  loadDemandExceedFaresByBranchId,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'demandExceedFares', reducer });
const withSaga = injectSaga({ key: 'demandExceedFares', saga });
export default compose(withReducer, withSaga, withConnect)(DemandExceedFareTimeLineByBranch);
