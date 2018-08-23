/**
 *
 * ConsumptionPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { isFilterReady } from '../MetersTreeFilter/utils';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectConsumptions,
  makeSelectConsumptionsFareAndWorkingHoursErrors,
  makeSelectConsumptionsLoading,
} from './selectors';
import { loadConsumptions } from './actions';
import ConsumptionChart from '../../components/ConsumptionChart';
import DefaultWarningToChart from '../../containers/DefaultWarningToChart';
import MetersTreeFilter from '../MetersTreeFilter';
import ConsumptionTable from './components/ConsumptionTable';
import FareAndWorkingHoursAlert from '../../components/FareAndWorkingHoursAlert/index';
import LoadingCard from '../../components/LoadingCard';
import { withMeterTreeAnalysisFilter } from '../../utils/withMeterTreeAnalysisFilter';

class ConsumptionPage extends Component {
  state = {
    isFilterReady: this.props.isFilterReady(),
    metersTreeValue: this.props.isFilterReady() ? this.props.filter : undefined,
  };

  componentDidMount() {
    if (this.props.isFilterReady()) {
      this.props.loadConsumptions(this.props.filter);
    }
  }

  handleMetersTreeFilterChange = (metersTreeFilter) => {
    const isFilterFilled = isFilterReady(metersTreeFilter);
    if (isFilterFilled) {
      this.props.loadConsumptions(metersTreeFilter);
    }
    this.setState({
      metersTreeValue: metersTreeFilter,
      isFilterReady: isFilterFilled,
    });
  };

  renderHead = () => (
    <Helmet>
      <title>Consumo - CUBI Energia</title>
    </Helmet>
  );

  render() {
    const { renderHead } = this;
    const {
      consumptions,
      consumptionsFareAndWorkingHoursErrors,
      loading,
    } = this.props;
    const { metersTreeValue } = this.state;
    return (
      <div>
        {renderHead()}
        <h1 className="_uppercase _page-title">Consumo</h1>
        <Card className="ant-col-24" style={{ position: 'relative' }}>
          <MetersTreeFilter
            value={metersTreeValue}
            onChange={this.handleMetersTreeFilterChange}
          />
          {!this.state.isFilterReady && consumptions ? (
            <DefaultWarningToChart />
          ) : (
            <LoadingCard loading={loading || !Object.keys(consumptions).length}>
              <ConsumptionChart consumptions={consumptions} />
              <FareAndWorkingHoursAlert
                fareAndWorkingHoursErrors={
                  consumptionsFareAndWorkingHoursErrors
                }
              />
              <ConsumptionTable consumptions={consumptions} />
            </LoadingCard>
          )}
        </Card>
      </div>
    );
  }
}

ConsumptionPage.propTypes = {
  consumptionsFareAndWorkingHoursErrors: PropTypes.array,
  consumptions: PropTypes.object.isRequired,
  loadConsumptions: PropTypes.func.isRequired,
  isFilterReady: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  consumptionsFareAndWorkingHoursErrors: makeSelectConsumptionsFareAndWorkingHoursErrors(),
  consumptions: makeSelectConsumptions(),
  loading: makeSelectConsumptionsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadConsumptions: (params) => dispatch(loadConsumptions(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'consumptions', reducer });
const withSaga = injectSaga({ key: 'consumptions', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withMeterTreeAnalysisFilter
)(ConsumptionPage);
