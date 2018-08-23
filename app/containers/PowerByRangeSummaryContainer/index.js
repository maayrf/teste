/**
 *
 * Alerts Emitted Page
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
  makeSelectPowerByRangeSummary,
  makeSelectPowerByRangeSummaryLoading,
} from './selectors';
import { loadPowerByRangeSummary } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import DateRangeSummary from '../../components/DateRangeSummary';

class PowerByRangeSummaryContainer extends Component {
  componentDidMount() {
    if (
      this.props.value &&
      this.props.value.rangeDate &&
      this.props.value.rangeDate.length
    ) {
      const [startDate, endDate] = this.props.value.rangeDate;
      this.loadPowerByRangeSummary(startDate, endDate);
    }
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.toString());
    }
  }

  onRangeDateChange = ([startDate, endDate]) => {
    this.loadPowerByRangeSummary(startDate, endDate);
  };
  loadPowerByRangeSummary = (startDate, endDate) => {
    const { meters } = this.props;
    this.props.loadPowerByRangeSummary({
      startDate,
      endDate,
      meters: meters.map(({ className, id }) => ({ className, id })),
    });
  };

  render() {
    const { loadingSummary, powerByRangeSummary } = this.props;

    return (
      <div className="power-cost-by-range-summary">
        <DateRangeSummary
          {...this.props}
          loadingSummary={loadingSummary}
          dateRangeSummary={powerByRangeSummary}
          onRangeDateChange={this.onRangeDateChange}
        />
      </div>
    );
  }
}

PowerByRangeSummaryContainer.propTypes = {
  alertType: PropTypes.string.isRequired,
  analysisInterval: PropTypes.string,
  meters: PropTypes.array,
  error: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.object,
  powerByRangeSummary: PropTypes.object.isRequired,
  loadingSummary: PropTypes.bool,
  loadPowerByRangeSummary: PropTypes.func.isRequired,
};

PowerByRangeSummaryContainer.defaultProps = {
  meters: [],
  onChange: () => {},
  loadingSummary: false,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  powerByRangeSummary: makeSelectPowerByRangeSummary(),
  loadingSummary: makeSelectPowerByRangeSummaryLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadPowerByRangeSummary: (params) =>
    dispatch(loadPowerByRangeSummary(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({
  key: 'powerByRangeSummary',
  reducer,
});
const withSaga = injectSaga({ key: 'powerByRangeSummary', saga });
export default compose(withReducer, withSaga, withConnect)(PowerByRangeSummaryContainer);
