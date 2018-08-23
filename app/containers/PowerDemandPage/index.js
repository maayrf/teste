/**
 *
 * PowerDemandPage
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { Alert, Card } from 'antd';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectPowerDemand,
  makeSelectPowerDemandLoading,
} from './selectors';
import { loadPowerDemand } from './actions';
import PowerDemandChart from '../../components/PowerDemandChart';
import PowerDemandTable from './components/PowerDemandTable';
import MetersTreeFilter from '../MetersTreeFilter';
import DefaultWarningToChart from '../../containers/DefaultWarningToChart/index';
import { isFilterReady } from '../MetersTreeFilter/utils';
import { makeSelectMetersFilter } from '../MetersTreeFilter/selectors';
import { withMeterTreeAnalysisFilter } from '../../utils/withMeterTreeAnalysisFilter';
import LoadingCard from '../../components/LoadingCard';

class PowerDemandPage extends Component {
  state = {
    isFilterReady: this.props.isFilterReady(),
    metersTreeValue: this.props.isFilterReady() ? this.props.filter : undefined,
  };

  componentDidMount() {
    if (this.props.isFilterReady()) {
      this.props.loadPowerDemand(this.props.filter);
    }
  }

  handleMetersTreeFilterChange = (metersTreeFilter) => {
    const isFilterFilled = isFilterReady(metersTreeFilter);
    if (isFilterFilled) {
      this.props.loadPowerDemand(metersTreeFilter);
    }
    this.setState({
      metersTreeValue: metersTreeFilter,
      isFilterReady: isFilterFilled,
    });
  };
  showMessageAlertInfo = () => (
    <div className="_margin-bottom">
      <Alert
        message="As potências plotadas são números máximos registrados em um período e não refletem o período como um todo"
        type="info"
        className="_margin-bottom"
        showIcon
      />
    </div>
  );
  renderHead = () => (
    <Helmet>
      <title>Demanda de Potência - CUBi Energia</title>
    </Helmet>
  );
  render() {
    const { renderHead } = this;
    const { powerDemands, loading } = this.props;
    const { metersTreeValue } = this.state;
    return (
      <div>
        {renderHead()}
        <h1 className="_uppercase _page-title">Demanda de Potência</h1>
        <Card className="ant-col-24" style={{ position: 'relative' }}>
          <MetersTreeFilter
            value={metersTreeValue}
            onChange={this.handleMetersTreeFilterChange}
          />
          {!this.state.isFilterReady ? (
            <DefaultWarningToChart />
          ) : (
            <LoadingCard loading={loading}>
              <PowerDemandChart powerDemands={powerDemands} />
              {this.showMessageAlertInfo()}
              <PowerDemandTable powerDemands={powerDemands} />
            </LoadingCard>
          )}
        </Card>
      </div>
    );
  }
}

PowerDemandPage.propTypes = {
  isFilterReady: PropTypes.func.isRequired,
  powerDemands: PropTypes.object,
  loadPowerDemand: PropTypes.func.isRequired,
  filter: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  powerDemands: makeSelectPowerDemand(),
  filter: makeSelectMetersFilter(),
  loading: makeSelectPowerDemandLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadPowerDemand: (params) => dispatch(loadPowerDemand(params)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'powerDemands', reducer });
const withSaga = injectSaga({ key: 'powerDemands', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect,
  withMeterTreeAnalysisFilter
)(PowerDemandPage);
