/**
 *
 * ProductiveHours Page
 * Tela de Rateio
 *
 */
import React, { Component } from 'react';
import { Card, notification, Icon } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import MeterTreeFilter from '../MetersTreeFilter/index';
import { loadProductiveHours } from './actions';
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
  makeSelectError,
  makeSelectProductiveHours,
  makeSelectProductiveHoursLoading,
  makeSelectProductiveHoursFareAndWorkingHoursErrors,
} from './selectors';
import { isFilterReady } from '../MetersTreeFilter/utils';
import { formatToMeterSelectionFilter } from '../../utils/formatToMeterSelectionFilter';
import ProductiveHoursCharts from './components/ProductiveHoursCharts/index';
import FareAndWorkingHoursAlert from '../../components/FareAndWorkingHoursAlert/index';
import ConsumptionCostTable from '../../components/ConsumptionCostTable';
import { generateColors } from '../../utils/generateColors';
import { formatDataToProductiveHoursChartsAndTable } from './utils/formatDataToProductiveHoursChartsAndTable';
import LoadingCard from '../../components/LoadingCard';
import { withMeterTreeAnalysisFilter } from '../../utils/withMeterTreeAnalysisFilter';

const renderName = (value, info) => {
  switch (info.name) {
    case 'Total':
      return <span className="_bold">Total</span>;
    case 'Horário produtivo':
    case 'Horário não produtivo':
      return <span> {value} </span>;
    default:
      return null;
  }
};

const renderColor = (value, info, index) =>
  info.name !== 'Total' ? (
    <div
      style={{
        backgroundColor: generateColors(index),
        width: '40px',
        height: '20px',
      }}
    />
  ) : null;

class ProductiveHoursPage extends Component {
  state = {
    isFilterReady: this.props.isFilterReady(),
    metersTreeValue: this.props.isFilterReady() ? this.props.filter : undefined,
  };

  componentDidMount() {
    if (this.props.isFilterReady()) {
      this.props.loadProductiveHours(this.props.filter);
    }
  }

  handleMetersTreeFilterChange = (metersTreeFilter) => {
    const isFilterFilled = isFilterReady(metersTreeFilter);
    if (isFilterFilled) {
      this.props.loadProductiveHours(metersTreeFilter);
    }
    this.setState({
      metersTreeValue: metersTreeFilter,
      isFilterReady: isFilterFilled,
    });
  };

  renderHead() {
    return (
      <Helmet>
        <title>Horário Produtivo - CUBI Energia</title>
      </Helmet>
    );
  }

  render() {
    const { renderHead } = this;
    const {
      productiveHours,
      productiveHoursFareAndWorkingHoursErrors,
      loading,
    } = this.props;
    const { metersTreeValue } = this.state;

    return (
      <div>
        {renderHead()}
        <h1 className="_uppercase _page-title">
          Horário Produtivo e Não Produtivo
        </h1>
        <Card>
          <MeterTreeFilter
            value={metersTreeValue}
            onChange={this.handleMetersTreeFilterChange}
          />
          {!this.state.isFilterReady ? (
            <DefaultWarningToChart />
          ) : (
            <LoadingCard loading={loading}>
              <ProductiveHoursCharts productiveHours={productiveHours} />
              <FareAndWorkingHoursAlert
                fareAndWorkingHoursErrors={
                  productiveHoursFareAndWorkingHoursErrors
                }
              />
              <ConsumptionCostTable
                rawData={productiveHours}
                handleData={formatDataToProductiveHoursChartsAndTable}
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

ProductiveHoursPage.propTypes = {
  productiveHoursFareAndWorkingHoursErrors: PropTypes.array,
  productiveHours: PropTypes.object,
  loading: PropTypes.bool,
  loadProductiveHours: PropTypes.func.isRequired,
  filter: PropTypes.object,
  isFilterReady: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  productiveHoursFareAndWorkingHoursErrors: makeSelectProductiveHoursFareAndWorkingHoursErrors(),
  productiveHours: makeSelectProductiveHours(),
  loading: makeSelectProductiveHoursLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadProductiveHours: (params) => dispatch(loadProductiveHours(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'productiveHours', reducer });
const withSaga = injectSaga({ key: 'productiveHours', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withMeterTreeAnalysisFilter
)(ProductiveHoursPage);
