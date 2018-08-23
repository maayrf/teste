/* eslint-disable no-shadow */
/**
 *
 * Demand Exceed Chart Container
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectPowerDemands,
  makeSelectDemandExceedChartLoading,
  makeSelectDemandExceed,
  makeSelectSummaries,
} from './selectors';
import { loadDemandExceedChartContainers } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard';
import DemandExceedChart from '../../components/DemandExceedChart';
import { transformDataToChart } from './transformDataToChart';
import moment from 'moment';
import DemandExceedTableList from '../../components/DemandExceedTableList/index';
import { Card } from 'antd';

class DemandExceedChartContainer extends Component {
  state = {
    maxWidth: 700,
  };
  componentDidMount() {
    const {
      month,
      year,
      branchId,
      loadDemandExceedChartContainers,
    } = this.props;
    if (month && year && branchId) {
      loadDemandExceedChartContainers({
        year,
        month,
        searchBranchId: branchId,
        maxWidth: this.state.maxWidth,
      });
    }
  }
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.message);
    }
  }
  handleWidth(value) {
    // console.log(value);
  }
  getHoursInMonth = (year, month) => {
    const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
    return daysInMonth * 24;
  };
  render() {
    const {
      loading,
      powerDemands,
      demandExceed,
      summaries,
      year,
      month,
    } = this.props;
    const hoursInMonth = this.getHoursInMonth(year, month);
    const powerDemandsTransformed = transformDataToChart(
      powerDemands,
      demandExceed.power
    );
    // TODO: Create a function for search the max power value
    const maxPowerDemand = powerDemands.length
      ? powerDemands[0].power
      : { power: 0, powerUnit: 'kW' };
    const { power, powerUnit } = maxPowerDemand;
    return (
      <div>
        <h5>DEMANDA E ULTRAPASSAGEM</h5>
        <Card className="dashboard-card">
          <div className="demand-exceed-chart-container-page">
            <p>
              Demanda <strong>máxima de {`${power} ${powerUnit}`}</strong> esse
              mês
            </p>
            <LoadingCard loading={loading}>
              <DemandExceedChart
                dataSource={powerDemandsTransformed}
                maxPowerDemand={power}
                demandExceed={demandExceed.power}
                hoursInMonth={hoursInMonth}
                handleWidth={this.handleWidth}
              />
              <DemandExceedTableList demandExceedTables={summaries} />
            </LoadingCard>
          </div>
        </Card>
      </div>
    );
  }
}

DemandExceedChartContainer.propTypes = {
  error: PropTypes.object,
  demandExceed: PropTypes.object.isRequired,
  powerDemands: PropTypes.array.isRequired,
  summaries: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadDemandExceedChartContainers: PropTypes.func.isRequired,
  month: PropTypes.number,
  year: PropTypes.number,
  branchId: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  powerDemands: makeSelectPowerDemands(),
  demandExceed: makeSelectDemandExceed(),
  summaries: makeSelectSummaries(),
  loading: makeSelectDemandExceedChartLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadDemandExceedChartContainers: (params) =>
    dispatch(loadDemandExceedChartContainers(params)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'demandExceedData', reducer });
const withSaga = injectSaga({ key: 'demandExceedData', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(DemandExceedChartContainer);
