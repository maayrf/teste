/**
 *
 * Demand Fare Time Line By Branch Page
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Row, Pagination } from 'antd';
import './style.less';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectDemandFaresError,
  makeSelectDemandFares,
  makeSelectDemandFaresLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadDemandFaresByBranchId } from './actions';
import reducer from './reducer';
import saga from './saga';
import LoadingCard from '../../components/LoadingCard/index';
import EditDemandFareButton from '../EditDemandFareButton/index';
import FareTimeLineList from '../../components/FareTimeLineList/index';
import { FARE_NOT_FOUND } from '../../utils/constants';
import AddDemandFareButton from '../AddDemandFareButton/index';
import openNotificationWithIcon from '../../utils/antd-notification';
import RemoveDemandFareButton from '../RemoveDemandFareButton/index';

class DemandFareTimeLineByBranch extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };

  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadDemandFares(currentPage, limit);
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
    this.loadDemandFares(currentPage, limit);
  };

  getOffset = (page, limit) => (page - 1) * limit;

  loadDemandFares = (page, limit) => {
    const { branchId, loadDemandFaresByBranchId } = this.props;
    const offset = this.getOffset(page, limit);
    loadDemandFaresByBranchId(branchId, {
      paginationStart: offset,
      paginationNumber: limit,
    });
  };

  render() {
    const {
      loading, demandFares, totalCount, limit, branchId,
    } = this.props;

    const { currentPage } = this.state;

    return (
      <div className="demand-fare-time-line-by-branch">
        <Row type="flex" justify="space-between" align="middle">
          <h2>Todas as Tarifas de Demanda Contratada</h2>
        </Row>
        <LoadingCard loading={loading}>
          <FareTimeLineList
            itemLayout="horizontal"
            notFoundMessage="Não há tarifa de demanda contratada cadastrada para este período"
            size="large"
            fares={demandFares}
            actionColumn={(demandFare) => {
              const { errorType } = demandFare;
              if (errorType === FARE_NOT_FOUND) {
                return (
                  <AddDemandFareButton
                    demandFare={{
                      branch: { id: branchId },
                      ...demandFare,
                    }}
                  />
                );
              }
              return (
                <Row type="flex" gutter={8}>
                  <EditDemandFareButton demandFare={demandFare} />
                  <RemoveDemandFareButton fare={demandFare} />
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

DemandFareTimeLineByBranch.propTypes = {
  error: PropTypes.object,
  branchId: PropTypes.number.isRequired,
  demandFares: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadDemandFaresByBranchId: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectDemandFaresError(),
  demandFares: makeSelectDemandFares(),
  loading: makeSelectDemandFaresLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = {
  loadDemandFaresByBranchId,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'demandFares', reducer });
const withSaga = injectSaga({ key: 'demandFares', saga });
export default compose(withReducer, withSaga, withConnect)(DemandFareTimeLineByBranch);
