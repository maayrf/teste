/**
 *
 * SelectPerformanceConfigurationWithLoad
 *
 */

import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectPerformanceConfigurations,
  makeSelectPerformanceConfigurationsLoading,
  makeSelectError,
} from '../PerformanceConfigurationListContainer/selectors';
import { loadPerformanceConfigurations } from '../PerformanceConfigurationListContainer/actions';
import reducer from '../PerformanceConfigurationListContainer/reducer';
import saga from '../PerformanceConfigurationListContainer/saga';
const SelectOption = Select.Option;

const REDUCER_KEY = 'performanceConfigurationsSelect';
const EMPTY_TITLE = 'Todos';

class SelectPerformanceConfigurationWithLoad extends Component {
  componentDidMount() {
    this.props.loadPerformanceConfigurations();
  }
  componentDidUpdate({ loading: prevLoading }) {
    const { loading, performanceConfigurations, onLoad } = this.props;
    if (loading !== prevLoading && loading === false) {
      onLoad(performanceConfigurations);
    }
  }
  renderOptions = () => {
    let { emptyTitle } = this.props;
    emptyTitle = emptyTitle || EMPTY_TITLE;
    const options = this.props.performanceConfigurations.map((pc) => (
      <SelectOption key={pc.id} value={pc.id}>
        {pc.name}
      </SelectOption>
    ));
    return [
      <SelectOption key={0} value="">
        {emptyTitle}
      </SelectOption>,
      ...options,
    ];
  };
  render() {
    return <Select {...this.props}>{this.renderOptions()}</Select>;
  }
}

SelectPerformanceConfigurationWithLoad.propTypes = {
  performanceConfigurations: PropTypes.array,
  loadPerformanceConfigurations: PropTypes.func,
  emptyTitle: PropTypes.string,
  onLoad: PropTypes.func,
  loading: PropTypes.bool,
};
SelectPerformanceConfigurationWithLoad.defaultProps = {
  onLoad: () => {},
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(REDUCER_KEY),
  performanceConfigurations: makeSelectPerformanceConfigurations(REDUCER_KEY),
  loading: makeSelectPerformanceConfigurationsLoading(REDUCER_KEY),
});

const mapDispatchToProps = (dispatch) => ({
  loadPerformanceConfigurations: () =>
    dispatch(loadPerformanceConfigurations()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({
  key: REDUCER_KEY,
  reducer,
});
const withSaga = injectSaga({ key: REDUCER_KEY, saga });

export default compose(withReducer, withSaga, withConnect)(SelectPerformanceConfigurationWithLoad);
