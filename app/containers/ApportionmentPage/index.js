/* eslint-disable no-mixed-operators */
/**
 *
 * Apportionment Page
 * Tela de Rateio
 *
 */
import React, { Component } from 'react';
import { Card, Icon, notification } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import MeterTreeFilter from '../MetersTreeFilter/index';
import { loadApportionments } from './actions';
import DefaultWarningToChart from '../../containers/DefaultWarningToChart';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectMetersFilter,
  makeSelectSelectedMeters,
} from '../MetersTreeFilter/selectors';
import {
  makeSelectApportionments,
  makeSelectApportionmentsLoading,
  makeSelectError,
  makeSelectApportionmentsFareAndWorkingHoursErrors,
} from './selectors';
import { isFilterReady } from '../MetersTreeFilter/utils';
import { formatToMeterSelectionFilter } from '../../utils/formatToMeterSelectionFilter';
import ApportionmentsConsumptionCharts from './components/ApportionmentsConsumptionCharts/index';
import FareAndWorkingHoursAlert from '../../components/FareAndWorkingHoursAlert/index';
import ConsumptionCostTable from '../../components/ConsumptionCostTable';
import { formatDataToApportionmentsConsumptionTable } from './utils/formatDataToApportionmentsConsumptionTable';
import LegendColorBoxByMeter from '../../components/LegendColorBoxByMeter';
import LoadingCard from '../../components/LoadingCard';
import { withMeterTreeAnalysisFilter } from '../../utils/withMeterTreeAnalysisFilter';

const renderColor = (color, info, index) => {
  if (String(info.name).toUpperCase() !== 'TOTAL') {
    return <LegendColorBoxByMeter index={index} typeMeter={info.className} />;
  }
  return null;
};

const renderName = (val, info) => {
  if (info.name === 'Total') {
    return <span className="_bold">{val}</span>;
  }
  return val;
};

class ApportionmentPage extends Component {
  state = {
    isFilterReady: this.props.isFilterReady(),
    metersTreeValue: this.props.isFilterReady() ? this.props.filter : undefined,
  };

  componentDidMount() {
    if (this.props.isFilterReady()) {
      this.props.loadApportionments(this.props.filter);
    }
  }

  handleMetersTreeFilterChange = (metersTreeFilter) => {
    const isFilterFilled = isFilterReady(metersTreeFilter);
    if (isFilterFilled) {
      this.props.loadApportionments(metersTreeFilter);
    }
    this.setState({
      metersTreeValue: metersTreeFilter,
      isFilterReady: isFilterFilled,
    });
  };

  renderHead = () => (
    <Helmet>
      <title>Rateio - CUBI Energia</title>
    </Helmet>
  );

  render() {
    const { renderHead } = this;
    const {
      loading,
      apportionments,
      apportionmentsFareAndWorkingHoursErrors,
    } = this.props;
    const { metersTreeValue } = this.state;
    return (
      <div>
        {renderHead()}
        <h1 className="_uppercase _page-title">Rateio</h1>
        <Card>
          <MeterTreeFilter
            value={metersTreeValue}
            onChange={this.handleMetersTreeFilterChange}
          />
          {!this.state.isFilterReady ? (
            <DefaultWarningToChart />
          ) : (
            <LoadingCard loading={loading}>
              <ApportionmentsConsumptionCharts
                apportionments={apportionments}
              />
              <FareAndWorkingHoursAlert
                fareAndWorkingHoursErrors={
                  apportionmentsFareAndWorkingHoursErrors
                }
              />
              <ConsumptionCostTable
                rawData={apportionments}
                handleData={formatDataToApportionmentsConsumptionTable}
                renderColor={renderColor}
                renderName={renderName}
                nameColumn="Nome"
              />
            </LoadingCard>
          )}
        </Card>
      </div>
    );
  }
}

ApportionmentPage.propTypes = {
  apportionmentsFareAndWorkingHoursErrors: PropTypes.array,
  apportionments: PropTypes.object,
  loading: PropTypes.bool,
  filter: PropTypes.object,
  loadApportionments: PropTypes.func,
  isFilterReady: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  apportionmentsFareAndWorkingHoursErrors: makeSelectApportionmentsFareAndWorkingHoursErrors(),
  apportionments: makeSelectApportionments(),
  loading: makeSelectApportionmentsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadApportionments: (params) => dispatch(loadApportionments(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'apportionments', reducer });
const withSaga = injectSaga({ key: 'apportionments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withMeterTreeAnalysisFilter
)(ApportionmentPage);
