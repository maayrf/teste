/**
 *
 * Performance Index Chart Container
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectPerformanceIndexCharts,
  makeSelectPerformanceIndexChartsLoading,
} from './selectors';
import { loadPerformanceIndexCharts } from './actions';
import reducer from './reducer';
import saga from './saga';
import PerformanceIndexChart from '../../components/PerformanceIndexChart';
import SelectPerforamanceConfigurationWithLoad from '../../containers/SelectPerformanceConfigurationWithLoad';
import { formatPerformanceIndexDataToChart } from './formatPerformanceIndexDataToChart';

class PerformanceIndexChartContainer extends Component {
  state = {
    idSelected: '',
  };
  componentDidUpdate(prevProps, prevState) {
    const { month, year, branchId } = this.props;
    const { idSelected } = this.state;
    if (
      month &&
      year &&
      branchId &&
      idSelected &&
      prevState.idSelected !== idSelected
    ) {
      this.props.loadPerformanceIndexCharts({
        month,
        year,
        searchBranchId: branchId,
        searchPerformanceConfigurationId: idSelected,
      });
    }
  }
  handleSelect = (value) => {
    this.setState({
      idSelected: value,
    });
  };
  handleLoadPerformanceConfigurations = (performanceConfigurations) => {
    if (performanceConfigurations.length) {
      this.setState({
        idSelected: performanceConfigurations[0].id,
      });
    }
  };
  render() {
    const { performanceIndexCharts } = this.props;
    const formatData = formatPerformanceIndexDataToChart(performanceIndexCharts);
    const { idSelected } = this.state;
    return (
      <div>
        <h5>ÍNDICE DE PERFORMANCE</h5>
        <Card
          className="dashboard-card"
          title={
            <Row type="flex" justify="space-between" align="middle">
              <Col>
                <SelectPerforamanceConfigurationWithLoad
                  onLoad={this.handleLoadPerformanceConfigurations}
                  onChange={this.handleSelect}
                  value={idSelected}
                  style={{ width: '100%' }}
                  emptyTitle="Selecione uma configuração de performance"
                />
              </Col>
            </Row>
          }
        >
          <PerformanceIndexChart dataSource={formatData} />
        </Card>
      </div>
    );
  }
}

PerformanceIndexChartContainer.propTypes = {
  error: PropTypes.object,
  performanceIndexCharts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadPerformanceIndexCharts: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  branchId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  performanceIndexCharts: makeSelectPerformanceIndexCharts(),
  loading: makeSelectPerformanceIndexChartsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadPerformanceIndexCharts: (params) =>
    dispatch(loadPerformanceIndexCharts(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'performanceIndexCharts', reducer });
const withSaga = injectSaga({ key: 'performanceIndexCharts', saga });
export default compose(withReducer, withSaga, withConnect)(PerformanceIndexChartContainer);
