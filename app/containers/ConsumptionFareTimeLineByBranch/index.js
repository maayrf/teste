/**
 *
 * Consumption Fare Time Line By Branch Page
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
  makeSelectConsumptionFaresError,
  makeSelectConsumptionFares,
  makeSelectConsumptionFaresLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadConsumptionFaresByBranchId } from './actions';
import reducer from './reducer';
import saga from './saga';
import LoadingCard from '../../components/LoadingCard/index';
import EditConsumptionFareButton from '../EditConsumptionFareButton/index';
import FareTimeLineList from '../../components/FareTimeLineList/index';
import { FARE_NOT_FOUND } from '../../utils/constants';
import RemoveConsumptionFareButton from '../../containers/RemoveConsumptionFareButton';
import openNotificationWithIcon from '../../utils/antd-notification';
import {
  makeSelectConsumptionFareLoading,
  makeSelectError,
} from '../ConsumptionFareFormContainer/selectors';
import AddConsumptionFareButton from '../AddConsumptionFareButton/index';
class ConsumptionFareTimeLineByBranch extends Component {
  state = {
    limit: 15,
    currentPage: 1,
  };

  componentDidMount() {
    const { limit, currentPage } = this.state;
    this.loadConsumptionFares(currentPage, limit);
  }

  componentDidUpdate() {
    const { errorFareForm } = this.props;

    if (errorFareForm) {
      openNotificationWithIcon('error', errorFareForm);
    }
  }
  onChangePage = (currentPage) => {
    this.setState({
      currentPage,
    });
    const { limit } = this.state;
    this.loadConsumptionFares(currentPage, limit);
  };

  getOffset = (page, limit) => (page - 1) * limit;

  loadConsumptionFares = (page, limit) => {
    const { branchId, loadConsumptionFaresByBranch } = this.props;
    const offset = this.getOffset(page, limit);
    loadConsumptionFaresByBranch(branchId, {
      paginationStart: offset,
      paginationNumber: limit,
    });
  };

  render() {
    const {
      loadingFares,
      consumptionFares,
      totalCount,
      limit,
      branchId,
    } = this.props;

    const { currentPage } = this.state;

    return (
      <div className="consumption-fare-time-line-by-branch">
        <Row type="flex" justify="space-between" align="middle">
          <h2>Todas as Tarifas de Consumo</h2>
        </Row>
        <LoadingCard loading={loadingFares}>
          <FareTimeLineList
            itemLayout="horizontal"
            notFoundMessage="Não há tarifa de consumo cadastrada para este período"
            size="large"
            fares={consumptionFares}
            actionColumn={(consumptionFare) => {
              const { errorType } = consumptionFare;
              if (errorType === FARE_NOT_FOUND) {
                return (
                  <AddConsumptionFareButton
                    consumptionFare={{
                      branch: { id: branchId },
                      ...consumptionFare,
                    }}
                  />
                );
              }
              return (
                <Row type="flex" gutter={8}>
                  <EditConsumptionFareButton
                    consumptionFare={consumptionFare}
                  />
                  <RemoveConsumptionFareButton fare={consumptionFare} />
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

ConsumptionFareTimeLineByBranch.propTypes = {
  branchId: PropTypes.number.isRequired,
  consumptionFares: PropTypes.array.isRequired,
  loadingFares: PropTypes.bool.isRequired,
  loadConsumptionFaresByBranch: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  errorFareForm: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectConsumptionFaresError(),
  consumptionFares: makeSelectConsumptionFares(),
  loadingFares: makeSelectConsumptionFaresLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
  loadingFareForm: makeSelectConsumptionFareLoading(),
  errorFareForm: makeSelectError(),
});

const mapDispatchToProps = (dispatch) => ({
  loadConsumptionFaresByBranch: (id, params) =>
    dispatch(loadConsumptionFaresByBranchId(id, params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducerConsumptionFares = injectReducer({
  key: 'consumptionFares',
  reducer,
});
const withSagaConsumptionFares = injectSaga({ key: 'consumptionFares', saga });
export default compose(
  withReducerConsumptionFares,
  withSagaConsumptionFares,
  withConnect
)(ConsumptionFareTimeLineByBranch);
