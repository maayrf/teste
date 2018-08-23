/**
 *
 * RushHours Page
 * Tela de Rateio
 *
 */
import React, { Component } from 'react';
import { Card } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { loadRushHours } from './actions';
import DefaultWarningToChart from '../../containers/DefaultWarningToChart';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectRushHours,
  makeSelectRushHoursLoading,
  makeSelectRushHoursFareAndWorkingHoursErrors,
} from './selectors';
import { isFilterReady } from '../MetersTreeFilter/utils';
import { formatDataToRushHoursChartsAndTable } from './utils/formatDataToRushHoursChartsAndTable';
import RushHoursCharts from './components/RushHoursCharts/index';
import FareAndWorkingHoursAlert from '../../components/FareAndWorkingHoursAlert/index';
import ConsumptionCostTable from '../../components/ConsumptionCostTable';
import LegendColorBoxByMeter from '../../components/LegendColorBoxByMeter';
import LoadingCard from '../../components/LoadingCard';
import MetersTreeFilter from '../MetersTreeFilter';
import { withMeterTreeAnalysisFilter } from '../../utils/withMeterTreeAnalysisFilter';

const renderColor = (value, info, index) =>
  info.name !== 'Total' ? <LegendColorBoxByMeter index={index} /> : null;

const renderName = (value, info) => {
  const defaultLabel = <span> {value} </span>;
  switch (info.name) {
    case 'Total':
      return <span className="_bold">Total</span>;
    case 'Horário de ponta':
    case 'Horário fora de ponta':
      return defaultLabel;
    default:
      return null;
  }
};

class RushHoursPage extends Component {
  state = {
    isFilterReady: this.props.isFilterReady(),
    metersTreeValue: this.props.isFilterReady() ? this.props.filter : undefined,
  };

  componentDidMount() {
    if (this.props.isFilterReady()) {
      this.props.loadRushHours(this.props.filter);
    }
  }

  handleMetersTreeFilterChange = (metersTreeFilter) => {
    const isFilterFilled = isFilterReady(metersTreeFilter);
    if (isFilterFilled) {
      this.props.loadRushHours(metersTreeFilter);
    }
    this.setState({
      metersTreeValue: metersTreeFilter,
      isFilterReady: isFilterFilled,
    });
  };

  renderHead() {
    return (
      <Helmet>
        <title>Horário de Ponta e Fora de Ponta - CUBI Energia</title>
      </Helmet>
    );
  }

  render() {
    const { renderHead } = this;
    const {
      loading,
      rushHours,
      rushHoursFareAndWorkingHoursErrors,
    } = this.props;
    const { metersTreeValue } = this.state;
    return (
      <div>
        {renderHead()}
        <h1 className="_uppercase _page-title">
          Horário de Ponta e Fora de Ponta
        </h1>
        <Card>
          <MetersTreeFilter
            value={metersTreeValue}
            onChange={this.handleMetersTreeFilterChange}
          />
          {!this.state.isFilterReady ? (
            <DefaultWarningToChart />
          ) : (
            <LoadingCard loading={loading}>
              <RushHoursCharts rushHours={rushHours} />
              <FareAndWorkingHoursAlert
                fareAndWorkingHoursErrors={rushHoursFareAndWorkingHoursErrors}
              />
              <ConsumptionCostTable
                rawData={rushHours}
                handleData={formatDataToRushHoursChartsAndTable}
                renderColor={renderColor}
                renderName={renderName}
              />
            </LoadingCard>
          )}
        </Card>
      </div>
    );
  }
}

RushHoursPage.propTypes = {
  rushHoursFareAndWorkingHoursErrors: PropTypes.array,
  rushHours: PropTypes.object,
  loading: PropTypes.bool,
  loadRushHours: PropTypes.func.isRequired,
  filter: PropTypes.object,
  isFilterReady: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  rushHoursFareAndWorkingHoursErrors: makeSelectRushHoursFareAndWorkingHoursErrors(),
  rushHours: makeSelectRushHours(),
  loading: makeSelectRushHoursLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadRushHours: (params) => dispatch(loadRushHours(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'rushHours', reducer });
const withSaga = injectSaga({ key: 'rushHours', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withMeterTreeAnalysisFilter
)(RushHoursPage);
